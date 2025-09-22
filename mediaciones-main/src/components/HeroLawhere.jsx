import React from "react";
import "./HeroLawhere.css";

export default function HeroLawhere() {
  return (
    <section className="hero-lawhere" id="home">
      {/* Video de fondo */}
      <video className="hero-video" autoPlay muted loop>
        <source src="video/mediacion.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      {/* Contenido sobre el video */}
      <div className="hero-overlay">
        <div className="hero-content">
          {/* Izquierda */}
          <div className="hero-left">
            <div className="hero-box">
              <h3>Nuestra Misión</h3>
              <p>
                Promover soluciones justas y efectivas mediante procesos de
                mediación que fortalezcan las relaciones humanas y profesionales.
              </p>
            </div>

            <div className="hero-box">
              <h3>Nuestra Visión</h3>
              <p>
                Ser líderes en mediación legal privada, garantizando confianza,
                transparencia y acuerdos sostenibles.
              </p>
            </div>
          </div>

          {/* Derecha */}
          <div className="hero-right">
            <div className="stat">
              <h4>98 575+</h4>
              <p>Horas de audiencia</p>
            </div>
            <div className="stat">
              <h4>12K</h4>
              <p>Clientes satisfechos</p>
            </div>
            <div className="stat">
              <h4>86%</h4>
              <p>Arbitrajes exitosos</p>
            </div>
            <div className="stat">
              <h4>35+</h4>
              <p>Años de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
