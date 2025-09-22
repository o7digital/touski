"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const PropertyDetailPage = () => {
  // ✅ Corrección: tipamos params para evitar error en build
  const params = useParams() as { id?: string };
  const id = params?.id;

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/property/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProperty(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error cargando propiedad:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="text-center pt-100">Cargando propiedad...</p>;
  if (!property) return <p className="text-center pt-100">Propiedad no encontrada.</p>;

  return (
    <div className="property-detail container pt-100 pb-100">
      <h1 className="mb-4">{property.title}</h1>
      <p className="text-muted">{property.location}</p>

      {property.property_images?.length > 0 && (
        <div className="row mb-4">
          {property.property_images.map((img: any, index: number) => (
            <div key={index} className="col-md-4 mb-3">
              <img src={img.url} alt={property.title} className="img-fluid rounded" />
            </div>
          ))}
        </div>
      )}

      <h3>Precio</h3>
      <p>{property.operations?.[0]?.formatted_amount || "Precio no disponible"}</p>

      <h3>Descripción</h3>
      <p>{property.description || "Sin descripción disponible"}</p>

      <h3>Características</h3>
      <ul>
        <li>Recámaras: {property.bedrooms || "N/A"}</li>
        <li>Baños: {property.bathrooms || "N/A"}</li>
        <li>Estacionamientos: {property.parking_spaces || "N/A"}</li>
        <li>
          Área: {property.building_size?.size || "N/A"} {property.building_size?.unit}
        </li>
      </ul>
    </div>
  );
};

export default PropertyDetailPage;
