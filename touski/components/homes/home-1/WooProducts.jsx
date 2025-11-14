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
                <h6 className="pc__title">
                  <Link href={`/product/${product.id}`}>{product.title}</Link>
                </h6>
                <div className="product-card__price d-flex">
                  {product.on_sale && product.regular_price ? (
                    <>
                      <span className="money price price-old">
                        ${product.regular_price.toFixed(2)}
                      </span>
                      <span className="money price price-sale">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="money price">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
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
