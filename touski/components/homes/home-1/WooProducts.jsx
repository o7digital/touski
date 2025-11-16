"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";

export default function WooProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 50;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(`/api/woocommerce/products?per_page=${productsPerPage}&page=${currentPage}`);
        const data = await response.json();
        
        // Récupérer le total depuis les headers si disponible
        const total = response.headers.get('X-WP-Total');
        if (total) setTotalProducts(parseInt(total));
        
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (loading && products.length === 0) {
    return (
      <section className="products-grid container">
        <h2 className="section-title text-center mb-3 pb-xl-2 mb-xl-4">
          Nos Produits
        </h2>
        <div className="text-center">Chargement des produits...</div>
      </section>
    );
  }

  if (!products.length && !loading) {
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
        Nos Produits {totalProducts > 0 && `(${totalProducts})`}
      </h2>

      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || loading}
          >
            &laquo; Précédent
          </button>
          
          <span className="mx-3">
            Page {currentPage} sur {totalPages}
          </span>
          
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || loading}
          >
            Suivant &raquo;
          </button>
        </div>
      )}

      <div className="text-center mt-4">
        <Link href="/shop-1" className="btn btn-primary">
          Voir tous les produits
        </Link>
      </div>
    </section>
  );
}
