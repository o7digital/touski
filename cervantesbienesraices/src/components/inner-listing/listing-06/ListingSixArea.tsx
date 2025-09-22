"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ListingSixArea = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(data => {
        setProperties(data.content || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando propiedades:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="property-listing-six pt-200 xl-pt-150 pb-200 xl-pb-120">
      <div className="container">
        <h2 className="mb-40 text-center">Propiedades disponibles</h2>

        {loading && <p className="text-center">Cargando propiedades...</p>}
        {!loading && properties.length === 0 && <p>No se encontraron propiedades.</p>}

        <div className="row">
          {properties.map((prop) => (
            <div key={prop.public_id} className="col-md-4 mb-4">
              <div className="property-card p-3 bg-white shadow-sm rounded">
                <img
                  src={prop.title_image_thumb || "/images/default-property.jpg"}
                  alt={prop.title}
                  className="img-fluid mb-3 rounded"
                />
                <h5>{prop.title}</h5>
                <p>{prop.location}</p>
                <p>
                  <strong>
                    {prop.operations[0]?.formatted_amount || "Precio no disponible"}
                  </strong>
                </p>
                <Link
                  href={`/property/${prop.public_id}`}
                  className="btn-one mt-3 d-block text-center"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingSixArea;
