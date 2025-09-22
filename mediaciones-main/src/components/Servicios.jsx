import React from 'react';
import './Servicios.css';

export default function Servicios() {
  const servicios = [
    {
      titulo: 'Mediación Privada Certificada con Fe Pública',
      desc: 'Acuerdos con validez legal y fuerza de cosa juzgada (vinculantes).',
    },
    {
      titulo: 'Áreas Civil y Mercantil',
      desc: 'Conflictos contractuales, comerciales, entre otros.',
    },
    {
      titulo: 'Áreas Bancario y Financiero',
      desc: 'Reestructuración de deudas, mediación hipotecaria.',
    },
    {
      titulo: 'Áreas Administrativo y Amparo',
      desc: 'Disputas con entidades públicas.',
    },
    {
      titulo: 'Áreas Familiar y Comunitaria',
      desc: 'Conflictos familiares o sociales.',
    },
    {
      titulo: 'Áreas Corporativo y Cumplimiento Normativo',
      desc: 'Gobierno corporativo, prevención de conflictos en empresas.',
    },
  ];

  return (
    <section id="servicios" className="servicios-section">
      <div className="servicios-container">
        <h2 className="servicios-title">Nuestros Servicios</h2>
        <div className="servicios-grid">
          {servicios.map((servicio, index) => (
            <div className="servicio-card" key={index}>
              <h3>{servicio.titulo}</h3>
              <p>{servicio.desc}</p>
              <button className="btn-ver-mas">Ver más</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
