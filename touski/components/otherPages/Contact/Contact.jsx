"use client";

import { storesLocations } from "@/data/storeLocations";

export default function Contact() {
  return (
    <section className="contact-us container">
      <div className="mw-930">
        <div className="row mb-5">
          <div className="col-lg-6">
            <h3 className="mb-4">TOUSKI Canada</h3>
            <p className="mb-4">
              <strong>Adresse / Address:</strong><br />
              1030, Avenue Muguette
              <br />
              Saint-Élie-de-Caxton QC G0X 2N0
              <br />
              Canada
            </p>
            <p className="mb-4">
              <strong>Contact:</strong><br />
              <a href="mailto:contact@touski.online" style={{color: '#FF9445'}}>contact@touski.online</a>
              <br />
              <a href="tel:+18197010378" style={{color: '#FF9445'}}>+1 819-701-0378</a>
            </p>
            <p className="mb-4">
              <strong>Horaires / Hours:</strong><br />
              Lundi - Vendredi: 9h - 17h<br />
              Monday - Friday: 9am - 5pm
            </p>
          </div>
          <div className="col-lg-6">
            <h3 className="mb-4">Pourquoi nous faire confiance?</h3>
            <p className="mb-3">
              ✓ Entreprise québécoise établie à Saint-Élie-de-Caxton<br />
              ✓ Service client dédié en français et anglais<br />
              ✓ Produits sélectionnés pour leur qualité<br />
              ✓ Livraison partout au Canada<br />
              ✓ Satisfaction client garantie
            </p>
            <p className="mb-3" style={{fontSize: '0.9rem', color: '#666'}}>
              <strong>Informations légales:</strong><br />
              Touski est une entreprise enregistrée au Québec.<br />
              Nous respectons toutes les normes de commerce en ligne canadiennes.
            </p>
          </div>
        </div>
        <div className="contact-us__form">
          <form
            className="needs-validation"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="mb-5">Nous contacter / Get In Touch</h3>
            <div className="form-floating my-4">
              <input
                type="text"
                className="form-control"
                id="contact_us_name"
                placeholder="Name *"
                required
              />
              <label htmlFor="contact_us_name">Name *</label>
            </div>
            <div className="form-floating my-4">
              <input
                type="email"
                className="form-control"
                id="contact_us_email"
                placeholder="Email address *"
                required
              />
              <label htmlFor="contact_us_name">Email address *</label>
            </div>
            <div className="my-4">
              <textarea
                className="form-control form-control_gray"
                placeholder="Your Message"
                cols="30"
                rows="8"
                required
              ></textarea>
            </div>
            <div className="my-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
