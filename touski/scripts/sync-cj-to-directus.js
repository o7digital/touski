/**
 * Script de synchronisation CJ → Directus
 * Gestion multi-fournisseurs avec calcul de marges
 */

import { createDirectus, rest, authentication, readItems, createItem, updateItem } from '@directus/sdk';

// Configuration
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || 'admin@example.com';
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || 'd1r3ctu5';

const CJ_API_BASE = process.env.CJ_BASE_URL || 'https://developers.cjdropshipping.com';
const CJ_TOKEN = process.env.CJ_STATIC_TOKEN || '';

// Client Directus
const directus = createDirectus(DIRECTUS_URL).with(rest()).with(authentication());

/**
 * Calcul du prix de vente avec marge
 */
function calculateSellPrice(costPrice, marginPercent, marginFixed) {
  const percentMargin = costPrice * (marginPercent / 100);
  return Number((costPrice + percentMargin + marginFixed).toFixed(2));
}

/**
 * Récupérer ou créer le fournisseur CJ dans Directus
 */
async function ensureCJProvider() {
  try {
    // Chercher le fournisseur CJ
    const providers = await directus.request(
      readItems('providers', {
        filter: { code: { _eq: 'cj' } }
      })
    );

    if (providers.length > 0) {
      return providers[0];
    }

    // Créer le fournisseur CJ s'il n'existe pas
    const newProvider = await directus.request(
      createItem('providers', {
        code: 'cj',
        name: 'CJ Dropshipping',
        api_url: CJ_API_BASE,
        default_margin_percent: 35.00, // 35% de marge par défaut
        default_margin_fixed: 2.00,    // + 2€ fixe
        is_active: true,
        sync_enabled: true
      })
    );

    console.log('✅ Fournisseur CJ créé:', newProvider.id);
    return newProvider;
  } catch (error) {
    console.error('❌ Erreur récupération fournisseur CJ:', error);
    throw error;
  }
}

/**
 * Récupérer produits CJ via API
 */
async function fetchCJProducts(preset = 'home', pageSize = 50) {
  const url = `${CJ_API_BASE}/api2.0/v1/product/list`;
  
  const params = new URLSearchParams({
    categoryId: preset === 'home' ? '1' : '',
    pageNum: '1',
    pageSize: pageSize.toString(),
    keyWord: ''
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      headers: {
        'CJ-Access-Token': CJ_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error(`CJ API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.code !== 200 || !data.data?.list) {
      throw new Error('Invalid CJ API response');
    }

    return data.data.list;
  } catch (error) {
    console.error('❌ Erreur fetch CJ products:', error);
    return [];
  }
}

/**
 * Trouver ou créer une catégorie
 */
async function ensureCategory(categoryName) {
  if (!categoryName) return null;

  try {
    const categories = await directus.request(
      readItems('categories', {
        filter: { name: { _eq: categoryName } }
      })
    );

    if (categories.length > 0) {
      return categories[0].id;
    }

    const newCategory = await directus.request(
      createItem('categories', {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-')
      })
    );

    return newCategory.id;
  } catch (error) {
    console.error('❌ Erreur catégorie:', error);
    return null;
  }
}

/**
 * Synchroniser un produit CJ vers Directus
 */
async function syncProduct(cjProduct, provider) {
  try {
    const sku = cjProduct.pid;
    const costPrice = Number(cjProduct.sellPrice || 0);
    
    // Utiliser les marges du fournisseur par défaut
    const marginPercent = provider.default_margin_percent || 30;
    const marginFixed = provider.default_margin_fixed || 0;
    
    // Calculer prix de vente
    const sellPrice = calculateSellPrice(costPrice, marginPercent, marginFixed);

    // Extraire URLs images
    const imageUrls = (cjProduct.productImage || []).map(img => img.url);
    const thumbnailUrl = imageUrls[0] || '';

    // Trouver/créer catégorie
    const categoryId = await ensureCategory(cjProduct.categoryName);

    // Vérifier si le produit existe déjà
    const existingProducts = await directus.request(
      readItems('products', {
        filter: { sku: { _eq: sku } }
      })
    );

    const productData = {
      sku,
      provider_id: provider.id,
      name: cjProduct.productNameEn || cjProduct.productName,
      description: cjProduct.description || '',
      category_id: categoryId,
      cost_price: costPrice,
      margin_percent: marginPercent,
      margin_fixed: marginFixed,
      sell_price: sellPrice,
      image_urls: imageUrls,
      thumbnail_url: thumbnailUrl,
      stock: cjProduct.stock || 0,
      weight: cjProduct.packWeight || 0,
      dimensions: {
        length: cjProduct.productSizeCm?.split('*')[0] || 0,
        width: cjProduct.productSizeCm?.split('*')[1] || 0,
        height: cjProduct.productSizeCm?.split('*')[2] || 0
      },
      variants: cjProduct.variants || [],
      metadata: {
        cj_product_id: cjProduct.pid,
        shipping_method: cjProduct.packType,
        original_data: cjProduct
      },
      is_featured: false,
      is_active: true,
      auto_sync: true,
      last_sync: new Date().toISOString()
    };

    if (existingProducts.length > 0) {
      // UPDATE produit existant
      await directus.request(
        updateItem('products', existingProducts[0].id, {
          cost_price: costPrice,
          sell_price: sellPrice,
          stock: productData.stock,
          image_urls: imageUrls,
          last_sync: productData.last_sync
        })
      );
      
      console.log(`✅ Mis à jour: ${productData.name} (${sku})`);
      return { action: 'updated', sku };
    } else {
      // CREATE nouveau produit
      await directus.request(
        createItem('products', productData)
      );
      
      console.log(`✅ Créé: ${productData.name} (${sku})`);
      return { action: 'created', sku };
    }
  } catch (error) {
    console.error(`❌ Erreur sync produit ${cjProduct.pid}:`, error);
    return { action: 'error', sku: cjProduct.pid, error: error.message };
  }
}

/**
 * Fonction principale de synchronisation
 */
async function syncCJToDirectus(options = {}) {
  const {
    preset = 'home',
    pageSize = 50,
    featuredOnly = true
  } = options;

  console.log('🚀 Début synchronisation CJ → Directus');
  console.log(`📦 Preset: ${preset}, PageSize: ${pageSize}`);

  try {
    // 1. Connexion Directus
    await directus.request(
      authentication('login', {
        email: DIRECTUS_EMAIL,
        password: DIRECTUS_PASSWORD
      })
    );
    console.log('✅ Connecté à Directus');

    // 2. Récupérer/créer fournisseur CJ
    const provider = await ensureCJProvider();
    console.log(`✅ Fournisseur CJ: ${provider.name} (marge: ${provider.default_margin_percent}%)`);

    // 3. Fetch produits CJ
    console.log('📥 Récupération produits CJ...');
    const cjProducts = await fetchCJProducts(preset, pageSize);
    console.log(`✅ ${cjProducts.length} produits récupérés`);

    if (cjProducts.length === 0) {
      console.log('⚠️ Aucun produit à synchroniser');
      return;
    }

    // 4. Synchroniser chaque produit
    const results = {
      created: 0,
      updated: 0,
      errors: 0,
      errorDetails: []
    };

    for (const cjProduct of cjProducts) {
      const result = await syncProduct(cjProduct, provider);
      
      if (result.action === 'created') results.created++;
      else if (result.action === 'updated') results.updated++;
      else if (result.action === 'error') {
        results.errors++;
        results.errorDetails.push(result);
      }
      
      // Pause pour éviter rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 5. Log final
    console.log('\n📊 Résumé de synchronisation:');
    console.log(`   ✅ Créés: ${results.created}`);
    console.log(`   🔄 Mis à jour: ${results.updated}`);
    console.log(`   ❌ Erreurs: ${results.errors}`);

    if (results.errors > 0) {
      console.log('\n❌ Détails erreurs:');
      results.errorDetails.forEach(err => {
        console.log(`   - SKU ${err.sku}: ${err.error}`);
      });
    }

    // 6. Créer log de sync
    await directus.request(
      createItem('sync_logs', {
        provider_id: provider.id,
        status: results.errors === 0 ? 'success' : 'error',
        products_synced: results.created + results.updated,
        errors: results.errorDetails
      })
    );

    // 7. Mettre à jour last_sync du provider
    await directus.request(
      updateItem('providers', provider.id, {
        last_sync: new Date().toISOString()
      })
    );

    console.log('\n✅ Synchronisation terminée !');
    
  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    throw error;
  }
}

// Export pour utilisation dans API routes
export { syncCJToDirectus, calculateSellPrice };

// Exécution en ligne de commande
if (import.meta.url === `file://${process.argv[1]}`) {
  syncCJToDirectus({
    preset: process.argv[2] || 'home',
    pageSize: parseInt(process.argv[3]) || 50
  })
    .then(() => {
      console.log('✅ Script terminé');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Script échoué:', error);
      process.exit(1);
    });
}
