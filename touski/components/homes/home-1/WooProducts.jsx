"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function WooProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/woocommerce/products?per_page=8');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="products-grid container">
        <h2 className="section-title text-center mb-3 pb-xl-2 mb-xl-4">
          Nos Produits
        </h2>
        <div className="text-center">Chargement des produits...</div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="products-grid container">
        <h2 className="section-title text-center mb-3 pb-xl-2 mb-xl-4">
          Nos Produits
        </h2>
        <div className="text-center">Aucun produit disponible</div>
      </section>
    );
  }

  return (
    <section className="products-grid container">
      <h2 className="section-title text-center mb-3 pb-xl-2 mb-xl-4">
        Nos Produits
      </h2>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="product-card">
              <div className="pc__img-wrapper">
                <Link href={`/product/${product.id}`}>
                  {product.image && (
                    <Image
                      src={product.image}
                      width={330}
                      height={400}
                      alt={product.title}
                      className="pc__img"
                    />
                  )}
                </Link>
              </div>

              <div className="pc__info position-relative">
                {/* Prix en PREMIER et PLUS GRAND - Style Amazon */}
                <div className="product-card__price d-flex align-items-baseline mb-2">
                  {product.on_sale && product.regular_price ? (
                    <>
                      <span className="money price price-sale fw-bold" style={{ fontSize: '24px', color: '#B12704' }}>
                        {product.price.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '24px', color: '#B12704', marginLeft: '2px' }}>$</span>
                      <span className="money price-old text-muted ms-2" style={{ fontSize: '14px', textDecoration: 'line-through' }}>
                        ${product.regular_price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="money price fw-bold" style={{ fontSize: '24px', color: '#0F1111' }}>
                        {product.price.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '24px', color: '#0F1111', marginLeft: '2px' }}>$</span>
                    </>
                  )}
                </div>
                
                {/* Titre APRÈS le prix */}
                <h6 className="pc__title" style={{ fontSize: '14px', lineHeight: '1.3', marginBottom: '8px' }}>
                  <Link href={`/product/${product.id}`} style={{ color: '#007185', textDecoration: 'none' }}>
                    {product.title}
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link href="/shop-1" className="btn btn-primary">
          Voir tous les produits
        </Link>
      </div>
    </section>
  );
}
