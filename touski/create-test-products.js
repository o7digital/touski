/**
 * Script pour créer des produits test dans WooCommerce
 */

require('dotenv').config({ path: '.env.local' });
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
});

const testProducts = [
  {
    name: "Canapé Moderne Gris",
    type: "simple",
    regular_price: "899.99",
    description: "Canapé 3 places moderne en tissu gris, design scandinave. Parfait pour votre salon.",
    short_description: "Canapé 3 places design scandinave",
    stock_status: "instock",
    manage_stock: true,
    stock_quantity: 15,
  },
  {
    name: "Table Basse Bois Massif",
    type: "simple",
    regular_price: "349.99",
    sale_price: "299.99",
    description: "Table basse en bois massif avec finition naturelle. Dimensions: 120x60x45cm",
    short_description: "Table basse bois massif 120cm",
    stock_status: "instock",
    stock_quantity: 8,
  },
  {
    name: "Chaise Design Blanc",
    type: "simple",
    regular_price: "129.99",
    description: "Chaise design moderne en plastique blanc avec pieds en bois. Lot de 2.",
    short_description: "Lot de 2 chaises design blanc",
    stock_status: "instock",
    stock_quantity: 24,
  },
  {
    name: "Lampe Suspension LED",
    type: "simple",
    regular_price: "199.99",
    description: "Lampe suspension LED design industriel en métal noir. Parfaite pour salle à manger.",
    short_description: "Lampe suspension LED industriel",
    stock_status: "instock",
    stock_quantity: 12,
  },
  {
    name: "Coussin Décoratif 45x45",
    type: "simple",
    regular_price: "29.99",
    sale_price: "24.99",
    description: "Coussin décoratif avec housse amovible, plusieurs couleurs disponibles. 45x45cm",
    short_description: "Coussin déco 45x45cm",
    stock_status: "instock",
    stock_quantity: 50,
  }
];

async function createProducts() {
  console.log('🚀 Création de produits test dans WooCommerce...\n');
  
  for (const product of testProducts) {
    try {
      const response = await api.post("products", product);
      console.log(`✅ Créé: ${response.data.name} (ID: ${response.data.id}, Prix: ${response.data.price} CAD)`);
    } catch (error) {
      console.error(`❌ Erreur pour "${product.name}":`, error.response?.data?.message || error.message);
    }
  }
  
  console.log('\n✅ Produits test créés ! Accède à http://localhost:3000/products pour les voir\n');
}

createProducts();
