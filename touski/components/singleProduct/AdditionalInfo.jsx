import React from "react";

export default function AdditionalInfo({ product }) {
  const weight = product?.weight;
  const dimensions = product?.dimensions;
  const attributes = product?.attributes || [];

  const hasDimensions =
    dimensions &&
    (dimensions.width || dimensions.height || dimensions.length);

  // Extract meta data helper
  const getMetaValue = (key) => {
    return product?.meta_data?.find(m => m.key === key)?.value;
  };

  return (
    <div className="product-single__addtional-info">
      <div className="item">
        <table className="table table-striped">
          <tbody>
            {weight && (
              <tr>
                <td className="fw-bold" style={{width: '30%'}}>Poids</td>
                <td>{weight} kg</td>
              </tr>
            )}

            {hasDimensions && (
              <tr>
                <td className="fw-bold">Dimensions</td>
                <td>
                  {dimensions.length} x {dimensions.width} x {dimensions.height} cm
                </td>
              </tr>
            )}

            {/* Display all attributes */}
            {attributes.map((attr) => (
              <tr key={attr.id || attr.name}>
                <td className="fw-bold">{attr.name}</td>
                <td>{Array.isArray(attr.options) ? attr.options.join(", ") : attr.options}</td>
              </tr>
            ))}

            {/* Display relevant meta data */}
            {getMetaValue('material') && (
              <tr>
                <td className="fw-bold">Material</td>
                <td>{getMetaValue('material')}</td>
              </tr>
            )}

            {getMetaValue('style') && (
              <tr>
                <td className="fw-bold">Style</td>
                <td>{getMetaValue('style')}</td>
              </tr>
            )}

            {getMetaValue('features') && (
              <tr>
                <td className="fw-bold">Features</td>
                <td>{getMetaValue('features')}</td>
              </tr>
            )}

            {(getMetaValue('colour') || getMetaValue('color')) && (
              <tr>
                <td className="fw-bold">Colour</td>
                <td>{getMetaValue('colour') || getMetaValue('color')}</td>
              </tr>
            )}

            {getMetaValue('capacity') && (
              <tr>
                <td className="fw-bold">Capacity</td>
                <td>{getMetaValue('capacity')}</td>
              </tr>
            )}

            {getMetaValue('size') && (
              <tr>
                <td className="fw-bold">Size</td>
                <td>{getMetaValue('size')}</td>
              </tr>
            )}

            {product?.sku && (
              <tr>
                <td className="fw-bold">SKU</td>
                <td>{product.sku}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!weight && !hasDimensions && !attributes.length && !product?.meta_data?.length && (
        <div className="item">
          <span>Informations supplémentaires non fournies pour ce produit.</span>
        </div>
      )}
    </div>
  );
}
