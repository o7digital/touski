import React from "react";

export default function AdditionalInfo({ product }) {
  const weight = product?.weight;
  const dimensions = product?.dimensions;
  const attributes = product?.attributes || [];

  const hasDimensions =
    dimensions &&
    (dimensions.width || dimensions.height || dimensions.length);

  return (
    <div className="product-single__addtional-info">
      {weight ? (
        <div className="item">
          <label className="h6">Poids</label>
          <span>{weight} kg</span>
        </div>
      ) : null}

      {hasDimensions ? (
        <div className="item">
          <label className="h6">Dimensions</label>
          <span>
            {dimensions.length} x {dimensions.width} x {dimensions.height} cm
          </span>
        </div>
      ) : null}

      {attributes.map((attr) => (
        <div key={attr.id || attr.name} className="item">
          <label className="h6">{attr.name}</label>
          <span>{Array.isArray(attr.options) ? attr.options.join(", ") : ""}</span>
        </div>
      ))}

      {!weight && !hasDimensions && !attributes.length ? (
        <div className="item">
          <span>Informations supplémentaires non fournies pour ce produit.</span>
        </div>
      ) : null}
    </div>
  );
}
