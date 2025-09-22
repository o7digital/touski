import React from 'react';

const products = [
  {
    title: 'Paquete Familiar',
    description: 'Incluye 3 sesiones de mediación familiar y asesoría jurídica inicial.',
    price: '$4,500 MXN',
  },
  {
    title: 'Paquete Empresarial',
    description: 'Mediación laboral para hasta 5 empleados, reporte final incluido.',
    price: '$7,200 MXN',
  },
  {
    title: 'Capacitación Legal',
    description: 'Curso intensivo en resolución de conflictos y derecho colaborativo.',
    price: '$2,800 MXN',
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Nuestros Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="border p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-bold text-blue-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
