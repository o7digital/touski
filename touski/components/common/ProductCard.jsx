"use client";
import Link from "next/link";
import Image from "next/image";

/**
 * Carte produit style Amazon - Nov 16, 2025
 * - Prix EN PREMIER et PLUS GRAND (24px)
 * - Signe $ APRÈS le prix (format: 67.99$)
 * - Titre après le prix en bleu Amazon
 */
export default function ProductCard({ product }) {
  const hasDiscount = product.on_sale && product.regular_price;
  const displayPrice = product.price ? product.price.toFixed(2) : '0.00';
  const regularPrice = product.regular_price ? product.regular_price.toFixed(2) : null;

  return (
    <div className="product-card h-100">
      <div className="pc__img-wrapper">
        <Link href={`/product/${product.id}`}>
          {product.image && (
            <Image
              src={product.image}
              width={330}
              height={400}
              alt={product.title || 'Product'}
              className="pc__img"
              style={{ objectFit: 'cover' }}
            />
          )}
        </Link>
      </div>

      {/* PRIX D'ABORD - hors du pc__info pour éviter les conflits CSS */}
      <div className="d-flex align-items-baseline mb-2 mt-3 px-2">
        {hasDiscount ? (
          <>
            <span 
              className="fw-bold" 
              style={{ fontSize: '28px', color: '#B12704', lineHeight: '1' }}
            >
              {displayPrice}
            </span>
            <span 
              style={{ fontSize: '22px', color: '#B12704', marginLeft: '2px' }}
            >
              $
            </span>
            <span 
              className="text-muted text-decoration-line-through ms-2" 
              style={{ fontSize: '14px' }}
            >
              {regularPrice}$
            </span>
          </>
        ) : (
          <>
            <span 
              className="fw-bold" 
              style={{ fontSize: '28px', color: '#0F1111', lineHeight: '1' }}
            >
              {displayPrice}
            </span>
            <span 
              style={{ fontSize: '22px', color: '#0F1111', marginLeft: '2px' }}
            >
              $
            </span>
          </>
        )}
      </div>

      {/* TITRE APRÈS - dans son propre div */}
      <div className="px-2">
        <Link 
          href={`/product/${product.id}`} 
          style={{ 
            color: '#007185', 
            textDecoration: 'none',
            fontSize: '14px',
            lineHeight: '1.3',
            display: 'block'
          }}
        >
          {product.title}
        </Link>
      </div>
    </div>
  );
}
