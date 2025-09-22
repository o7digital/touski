import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contacto" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contáctanos</h2>
        <p className="contact-description">
          Si tienes dudas o deseas agendar una mediación, llena el formulario y nos pondremos en contacto contigo.
        </p>
        <form className="contact-form">
          <input 
            type="text" 
            placeholder="Nombre completo" 
            required 
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            required 
          />
          <textarea 
            placeholder="Escribe tu mensaje aquí" 
            rows="5" 
            required
          ></textarea>
          <button type="submit" className="contact-btn">Enviar mensaje</button>
        </form>
      </div>
    </section>
  );
}
