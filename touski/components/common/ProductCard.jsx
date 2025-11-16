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

      <div className="pc__info position-relative pt-3" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* PRIX EN PREMIER - Style Amazon */}
        <div className="product-card__price d-flex align-items-baseline mb-2" style={{ order: 1 }}>
          {hasDiscount ? (
            <>
              <span 
                className="money price-current fw-bold" 
                style={{ fontSize: '24px', color: '#B12704', lineHeight: '1.2' }}
              >
                {displayPrice}
              </span>
              <span 
                className="currency-symbol" 
                style={{ fontSize: '20px', color: '#B12704', marginLeft: '2px' }}
              >
                $
              </span>
              <span 
                className="money price-old text-muted text-decoration-line-through ms-2" 
                style={{ fontSize: '13px' }}
              >
                {regularPrice}$
              </span>
            </>
          ) : (
            <>
              <span 
                className="money price-current fw-bold" 
                style={{ fontSize: '24px', color: '#0F1111', lineHeight: '1.2' }}
              >
                {displayPrice}
              </span>
              <span 
                className="currency-symbol" 
                style={{ fontSize: '20px', color: '#0F1111', marginLeft: '2px' }}
              >
                $
              </span>
            </>
          )}
        </div>
        
        {/* TITRE APRÈS - Style Amazon */}
        <h6 
          className="pc__title mb-0" 
          style={{ 
            fontSize: '14px', 
            lineHeight: '1.4', 
            fontWeight: '400',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            order: 2
          }}
        >
          <Link 
            href={`/product/${product.id}`} 
            style={{ color: '#007185', textDecoration: 'none' }}
            className="product-title-link"
          >
            {product.title}
          </Link>
        </h6>
      </div>
    </div>
  );
}
