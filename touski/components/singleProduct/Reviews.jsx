"use client";

export default function Reviews({ productName = "ce produit" }) {
  return (
    <div className="product-single__review-form">
      <h2 className="product-single__reviews-title">Avis clients</h2>
      <p className="mb-3">
        Aucun avis publie pour le moment sur {productName}.
      </p>
      <p className="text-secondary mb-0">
        Les avis verifies seront affiches ici des qu'ils seront disponibles.
      </p>
    </div>
  );
}
