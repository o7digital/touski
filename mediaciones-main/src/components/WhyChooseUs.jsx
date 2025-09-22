import React from 'react';

const reasons = [
  {
    icon: '🧑‍⚖️',
    title: 'Experiencia Profesional',
    description: 'Más de 15 años resolviendo casos con éxito en distintas áreas de mediación.',
  },
  {
    icon: '🕊️',
    title: 'Enfoque Humanista',
    description: 'Atención centrada en las personas y la construcción de acuerdos duraderos.',
  },
  {
    icon: '💡',
    title: 'Soluciones Creativas',
    description: 'Cada conflicto es único, nuestras estrategias también.',
  },
  {
    icon: '⏱️',
    title: 'Rapidez y Eficiencia',
    description: 'Procesos ágiles que evitan juicios largos y costosos.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((reason, index) => (
            <div key={index} className="p-6 rounded-lg shadow hover:shadow-lg border">
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
