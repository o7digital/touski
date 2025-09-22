import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna izquierda */}
        <div className="footer-col">
          <h3>Mediaciones</h3>
          <p>
            Soluciones legales efectivas a través de mediación privada certificada,
            reduciendo tiempos, costos y preservando relaciones.
          </p>
        </div>

        {/* Columna central */}
        <div className="footer-col">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#quienes-somos">Quiénes somos</a></li>
            <li><a href="#mediacion">La Mediación</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Columna derecha */}
        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Tel: +52 55 4616 7798</p>
          <p>Email: info@mediaciones.com</p>
          <p>Río Pánuco 43, Col. Renacimiento, Cuauhtémoc, CDMX</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Mediaciones. Todos los derechos reservados. 
          <a href="#aviso-privacidad"> Aviso de Privacidad</a>
        </p>
      </div>
    </footer>
  );
}
