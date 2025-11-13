/**
 * Script de test WooCommerce (CommonJS)
 */

require('dotenv').config({ path: '.env.local' });
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

console.log('🔍 Test de connexion WooCommerce...\n');

console.log('Configuration:');
console.log('URL:', process.env.NEXT_PUBLIC_WOOCOMMERCE_URL);
console.log('Consumer Key:', process.env.WOOCOMMERCE_CONSUMER_KEY ? '✅ Définie' : '❌ Manquante');
console.log('Consumer Secret:', process.env.WOOCOMMERCE_CONSUMER_SECRET ? '✅ Définie' : '❌ Manquante');
console.log('');

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

async function testConnection() {
  try {
    // Test produits
    console.log('📦 Récupération des produits...');
    const productsResponse = await api.get("products", { per_page: 5 });
    const products = productsResponse.data;
    
    console.log(`✅ ${products.length} produit(s) trouvé(s)`);
    
    if (products.length > 0) {
      console.log('\nPremier produit:');
      console.log('  - Titre:', products[0].name);
      console.log('  - Prix:', products[0].price, 'CAD');
      console.log('  - Stock:', products[0].stock_status);
      console.log('  - Images:', products[0].images.length);
    } else {
      console.log('\n⚠️  Aucun produit trouvé.');
      console.log('👉 Créez des produits test dans WooCommerce:');
      console.log('   http://oliviers42.sg-host.com/wp-admin/post-new.php?post_type=product');
    }
    
    // Test catégories
    console.log('\n📁 Récupération des catégories...');
    const categoriesResponse = await api.get("products/categories", { per_page: 10 });
    const categories = categoriesResponse.data;
    
    console.log(`✅ ${categories.length} catégorie(s) trouvée(s)`);
    
    if (categories.length > 0) {
      console.log('\nCatégories disponibles:');
      categories.slice(0, 5).forEach(cat => {
        console.log(`  - ${cat.name} (${cat.count} produits)`);
      });
    }
    
    console.log('\n✅ Connexion WooCommerce fonctionnelle !');
    console.log('\n🎯 Prochaine étape: Adapter les pages Next.js pour utiliser WooCommerce\n');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Statut HTTP:', error.response.status);
      console.error('Détails:', error.response.data);
    }
    process.exit(1);
  }
}

testConnection();
