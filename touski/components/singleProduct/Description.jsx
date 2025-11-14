import React from "react";

export default function Description({ product }) {
  const html = product?.description || "<p>Description non disponible pour ce produit.</p>";

  return (
    <div className="product-single__description">
      {/* Description HTML du produit (contient déjà tout) */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
