/**
 * Script de test pour vérifier la connexion WooCommerce
 */

// Charger les variables d'environnement
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

// Import du module WooCommerce
import { getProducts, getCategories } from './lib/woocommerce.js';

async function testWooCommerceConnection() {
  console.log('🔍 Test de connexion WooCommerce...\n');
  
  console.log('Configuration:');
  console.log('URL:', process.env.NEXT_PUBLIC_WOOCOMMERCE_URL);
  console.log('Consumer Key:', process.env.WOOCOMMERCE_CONSUMER_KEY ? '✅ Définie' : '❌ Manquante');
  console.log('Consumer Secret:', process.env.WOOCOMMERCE_CONSUMER_SECRET ? '✅ Définie' : '❌ Manquante');
  console.log('');
  
  try {
    // Test récupération produits
    console.log('📦 Récupération des produits...');
    const products = await getProducts({ per_page: 5 });
    console.log(`✅ ${products.length} produit(s) trouvé(s)`);
    
    if (products.length > 0) {
      console.log('\nPremier produit:');
      console.log('  - Titre:', products[0].title);
      console.log('  - Prix:', products[0].price, 'CAD');
      console.log('  - Stock:', products[0].stock_status);
      console.log('  - Images:', products[0].images.length);
    } else {
      console.log('\n⚠️  Aucun produit trouvé.');
      console.log('👉 Créez des produits test dans WooCommerce:');
      console.log('   http://oliviers42.sg-host.com/wp-admin/post-new.php?post_type=product');
    }
    
    // Test récupération catégories
    console.log('\n📁 Récupération des catégories...');
    const categories = await getCategories({ per_page: 10 });
    console.log(`✅ ${categories.length} catégorie(s) trouvée(s)`);
    
    if (categories.length > 0) {
      console.log('\nCatégories disponibles:');
      categories.slice(0, 5).forEach(cat => {
        console.log(`  - ${cat.name} (${cat.count} produits)`);
      });
    }
    
    console.log('\n✅ Connexion WooCommerce fonctionnelle !');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:');
    console.error(error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
  }
}

testWooCommerceConnection();
