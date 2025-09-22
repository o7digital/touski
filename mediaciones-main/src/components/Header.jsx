import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Redes sociales */}
        <div className="social-icons">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="#" aria-label="TikTok"><FaTiktok /></a>
        </div>

        {/* Logo */}
        <h1 className="logo">Mediaciones</h1>

        {/* Menú desktop */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#quienes-somos" onClick={() => setMenuOpen(false)}>Quiénes Somos</a>
          <a href="#mediacion" onClick={() => setMenuOpen(false)}>La Mediación</a>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>

        {/* Teléfono y correo */}
        <div className="contact-info">
          <p>Tel: +52 55 4616 7798</p>
          <p className="email">info@mediaciones.com</p>
        </div>

        {/* Botón menú móvil */}
        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#quienes-somos" onClick={() => setMenuOpen(false)}>Quiénes Somos</a>
          <a href="#mediacion" onClick={() => setMenuOpen(false)}>La Mediación</a>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </div>
      )}
    </header>
  );
}
