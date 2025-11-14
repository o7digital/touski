import React from "react";

export default function Description({ product }) {
  const html =
    product?.description ||
    product?.short_description ||
    "<p>Description non disponible pour ce produit.</p>";

  return (
    <div className="product-single__description">
      <div
        className="content"
        // Le HTML vient de WooCommerce (description CJ importée)
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
