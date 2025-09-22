import React from 'react';

const services = [
  {
    title: 'Mediación Familiar',
    description: 'Resolución de conflictos familiares con enfoque humano y profesional.',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    title: 'Mediación Laboral',
    description: 'Soluciones efectivas para conflictos entre empleadores y trabajadores.',
    icon: '💼',
  },
  {
    title: 'Mediación Civil y Mercantil',
    description: 'Alternativas legales para conflictos civiles y comerciales.',
    icon: '⚖️',
  },
  {
    title: 'Capacitación Legal',
    description: 'Cursos y talleres en resolución de conflictos y derecho colaborativo.',
    icon: '📚',
  },
];

export default function ServicesShowcase() {
  return (
    <section id="services" className="py-20 bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
