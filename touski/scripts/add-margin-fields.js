/**
 * Script pour ajouter les champs de marges à Directus
 * Exécution: node scripts/add-margin-fields.js
 */

import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://touski-admin-directus-production.up.railway.app';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD;

let accessToken = null;

/**
 * Connexion à Directus
 */
async function login() {
  const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: DIRECTUS_EMAIL,
      password: DIRECTUS_PASSWORD
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Login failed: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  accessToken = data.data.access_token;
  return accessToken;
}

/**
 * Créer un champ dans une collection
 */
async function createField(collection, fieldData) {
  const response = await fetch(`${DIRECTUS_URL}/fields/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(fieldData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return await response.json();
}

/**
 * Ajouter les champs de marges
 */
async function addMarginFields() {
  console.log('🚀 Ajout des champs de marges à Directus\n');
  console.log(`📍 URL: ${DIRECTUS_URL}\n`);

  try {
    // Connexion
    console.log('🔐 Connexion à Directus...');
    await login();
    console.log('✅ Connecté!\n');

    // ===============================================
    // 1. AJOUTER CHAMPS À PROVIDERS
    // ===============================================
    console.log('📦 Ajout champs à la collection PROVIDERS...\n');

    try {
      await createField('providers', {
        field: 'default_margin_percent',
        type: 'decimal',
        meta: {
          interface: 'input',
          width: 'half',
          note: 'Marge par défaut en % (ex: 35 pour 35%)'
        },
        schema: {
          numeric_precision: 5,
          numeric_scale: 2,
          default_value: '30.00'
        }
      });
      console.log('  ✅ default_margin_percent ajouté');
    } catch (error) {
      if (error.message?.includes('already exists') || error.message?.includes('FIELD_DUPLICATE')) {
        console.log('  ⚠️  default_margin_percent existe déjà');
      } else {
        console.log('  ❌ Erreur:', error.message);
      }
    }

    try {
      await createField('providers', {
        field: 'default_margin_fixed',
        type: 'decimal',
        meta: {
          interface: 'input',
          width: 'half',
          note: 'Marge fixe en € ajoutée en plus (ex: 2.00)'
        },
        schema: {
          numeric_precision: 10,
          numeric_scale: 2,
          default_value: '0.00'
        }
      });
      console.log('  ✅ default_margin_fixed ajouté\n');
    } catch (error) {
      if (error.message?.includes('already exists') || error.message?.includes('FIELD_DUPLICATE')) {
        console.log('  ⚠️  default_margin_fixed existe déjà\n');
      } else {
        console.log('  ❌ Erreur:', error.message);
      }
    }

    // ===============================================
    // 2. AJOUTER CHAMPS À PRODUCTS
    // ===============================================
    console.log('📦 Ajout champs à la collection PRODUCTS...\n');

    try {
      await createField('products', {
        field: 'margin_percent',
        type: 'decimal',
        meta: {
          interface: 'input',
          width: 'third',
          note: 'Marge en % (override fournisseur)'
        },
        schema: {
          numeric_precision: 5,
          numeric_scale: 2,
          is_nullable: true
        }
      });
      console.log('  ✅ margin_percent ajouté');
    } catch (error) {
      if (error.message?.includes('already exists') || error.message?.includes('FIELD_DUPLICATE')) {
        console.log('  ⚠️  margin_percent existe déjà');
      } else {
        console.log('  ❌ Erreur:', error.message);
      }
    }

    try {
      await createField('products', {
        field: 'margin_fixed',
        type: 'decimal',
        meta: {
          interface: 'input',
          width: 'third',
          note: 'Marge fixe en € (override fournisseur)'
        },
        schema: {
          numeric_precision: 10,
          numeric_scale: 2,
          default_value: '0.00',
          is_nullable: true
        }
      });
      console.log('  ✅ margin_fixed ajouté');
    } catch (error) {
      if (error.message?.includes('already exists') || error.message?.includes('FIELD_DUPLICATE')) {
        console.log('  ⚠️  margin_fixed existe déjà');
      } else {
        console.log('  ❌ Erreur:', error.message);
      }
    }

    try {
      await createField('products', {
        field: 'auto_calculate_price',
        type: 'boolean',
        meta: {
          interface: 'boolean',
          width: 'third',
          note: 'Calculer automatiquement le prix de vente'
        },
        schema: {
          default_value: true
        }
      });
      console.log('  ✅ auto_calculate_price ajouté\n');
    } catch (error) {
      if (error.message?.includes('already exists') || error.message?.includes('FIELD_DUPLICATE')) {
        console.log('  ⚠️  auto_calculate_price existe déjà\n');
      } else {
        console.log('  ❌ Erreur:', error.message);
      }
    }

    // ===============================================
    // RÉSUMÉ
    // ===============================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ TERMINÉ!\n');
    console.log('Champs ajoutés:');
    console.log('  📋 PROVIDERS:');
    console.log('    - default_margin_percent (decimal)');
    console.log('    - default_margin_fixed (decimal)');
    console.log('  📋 PRODUCTS:');
    console.log('    - margin_percent (decimal)');
    console.log('    - margin_fixed (decimal)');
    console.log('    - auto_calculate_price (boolean)\n');
    console.log('Prochaine étape:');
    console.log('  1. Aller dans Directus → Providers');
    console.log('  2. Définir les marges par défaut (ex: 35% + 2€)');
    console.log('  3. Lancer le script de sync: npm run sync:cj');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    process.exit(1);
  }
}

// Exécuter
addMarginFields()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
