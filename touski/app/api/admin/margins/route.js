/**
 * API Route: Gestion des marges produits
 * POST /api/admin/margins
 */

import { NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD;

/**
 * Calcul du prix de vente
 */
function calculateSellPrice(costPrice, marginPercent, marginFixed = 0) {
  const percentMargin = costPrice * (marginPercent / 100);
  return Number((costPrice + percentMargin + marginFixed).toFixed(2));
}

/**
 * Connexion à Directus
 */
async function getDirectusToken() {
  const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: DIRECTUS_EMAIL,
      password: DIRECTUS_PASSWORD
    })
  });

  if (!response.ok) {
    throw new Error('Directus login failed');
  }

  const data = await response.json();
  return data.data.access_token;
}

/**
 * POST - Mettre à jour les marges
 * Body: {
 *   action: 'update_product' | 'update_provider' | 'recalculate_all',
 *   product_id?: string,
 *   provider_id?: string,
 *   margin_percent?: number,
 *   margin_fixed?: number
 * }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, product_id, provider_id, margin_percent, margin_fixed } = body;

    // Connexion Directus
    const token = await getDirectusToken();

    // Action 1: Mettre à jour la marge d'un produit spécifique
    if (action === 'update_product' && product_id) {
      const productResponse = await fetch(
        `${DIRECTUS_URL}/items/products?filter[id][_eq]=${product_id}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const productData = await productResponse.json();
      
      if (!productData.data || productData.data.length === 0) {
        return NextResponse.json(
          { error: 'Produit non trouvé' },
          { status: 404 }
        );
      }

      const currentProduct = productData.data[0];
      const newMarginPercent = margin_percent ?? currentProduct.margin_percent;
      const newMarginFixed = margin_fixed ?? currentProduct.margin_fixed;
      const newSellPrice = calculateSellPrice(
        currentProduct.cost_price,
        newMarginPercent,
        newMarginFixed
      );

      await fetch(`${DIRECTUS_URL}/items/products/${product_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          margin_percent: newMarginPercent,
          margin_fixed: newMarginFixed,
          price: newSellPrice
        })
      });

      return NextResponse.json({
        success: true,
        message: 'Marge produit mise à jour',
        product: {
          id: product_id,
          cost_price: currentProduct.cost_price,
          margin_percent: newMarginPercent,
          margin_fixed: newMarginFixed,
          price: newSellPrice
        }
      });
    }

    // Action 2: Mettre à jour les marges par défaut d'un fournisseur
    if (action === 'update_provider' && provider_id) {
      await fetch(`${DIRECTUS_URL}/items/providers/${provider_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          default_margin_percent: margin_percent,
          default_margin_fixed: margin_fixed
        })
      });

      return NextResponse.json({
        success: true,
        message: 'Marges fournisseur mises à jour',
        provider_id,
        margin_percent,
        margin_fixed
      });
    }

    // Action 3: Recalculer tous les prix de vente
    if (action === 'recalculate_all') {
      const productsResponse = await fetch(
        `${DIRECTUS_URL}/items/products?fields=id,cost_price,margin_percent,margin_fixed`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      const productsData = await productsResponse.json();
      const products = productsData.data || [];

      let updated = 0;
      for (const product of products) {
        const newSellPrice = calculateSellPrice(
          product.cost_price,
          product.margin_percent || 30,
          product.margin_fixed || 0
        );

        await fetch(`${DIRECTUS_URL}/items/products/${product.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            price: newSellPrice
          })
        });
        updated++;
      }

      return NextResponse.json({
        success: true,
        message: `${updated} prix de vente recalculés`,
        updated
      });
    }

    return NextResponse.json(
      { error: 'Action invalide' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Erreur API margins:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET - Obtenir un aperçu des marges
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider_id = searchParams.get('provider_id');

    const token = await getDirectusToken();

    let url = `${DIRECTUS_URL}/items/products?fields=id,name,sku,cost_price,margin_percent,margin_fixed,price,supplier_id`;
    if (provider_id) {
      url += `&filter[supplier_id][_eq]=${provider_id}`;
    }

    const productsResponse = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const productsData = await productsResponse.json();
    const products = productsData.data || [];

    // Calculer statistiques
    const stats = products.reduce((acc, p) => {
      const profit = p.price - p.cost_price;
      const profitPercent = (profit / p.cost_price) * 100;
      
      acc.totalProducts++;
      acc.totalCost += p.cost_price;
      acc.totalSell += p.price;
      acc.totalProfit += profit;
      acc.avgMarginPercent += profitPercent;
      
      return acc;
    }, {
      totalProducts: 0,
      totalCost: 0,
      totalSell: 0,
      totalProfit: 0,
      avgMarginPercent: 0
    });

    if (stats.totalProducts > 0) {
      stats.avgMarginPercent /= stats.totalProducts;
    }

    return NextResponse.json({
      success: true,
      stats: {
        ...stats,
        avgMarginPercent: stats.avgMarginPercent.toFixed(2)
      },
      products: products.slice(0, 50) // Limiter à 50 pour preview
    });

  } catch (error) {
    console.error('Erreur GET margins:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
