import React from "react";

export default function Description({ product }) {
  const html = product?.description || "<p>Description non disponible pour ce produit.</p>";

  // Extract meta data for additional product details
  const getMetaValue = (key) => {
    return product?.meta_data?.find(m => m.key === key)?.value;
  };

  return (
    <div className="product-single__description">
      {/* Main Description */}
      <div
        className="content mb-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      
      {/* Product Specifications Table */}
      {product?.meta_data && product.meta_data.length > 0 && (
        <div className="product-specifications mt-4">
          <h5 className="mb-3">Spécifications du produit</h5>
          <table className="table table-bordered">
            <tbody>
              {getMetaValue('material') && (
                <tr>
                  <td className="fw-bold" style={{width: '30%'}}>Material</td>
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
            </tbody>
          </table>
        </div>
      )}
      
      {/* Packing List */}
      {getMetaValue('packing_list') && (
        <div className="packing-list mt-4">
          <h5 className="mb-3">Packing list</h5>
          <div className="packing-list-content">
            {getMetaValue('packing_list')}
          </div>
        </div>
      )}
    </div>
  );
}
