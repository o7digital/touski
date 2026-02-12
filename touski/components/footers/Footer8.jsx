"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { languageOptions, socialLinks } from "@/data/footer";
import { usePathname, useRouter } from "next/navigation";
import {
  getLocaleFromPathname,
  getLocaleValue,
  switchLocalePath,
  withLocale,
} from "@/lib/i18n";

export default function Footer8() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname || "/");

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    const nextPath = switchLocalePath(pathname || "/", value);

    if (typeof document !== "undefined") {
      document.cookie = `touski-lang=${value}; path=/; max-age=${
        60 * 60 * 24 * 365
      }`;
    }

    if (nextPath !== pathname) {
      router.push(nextPath);
    }
  };

  const ui = {
    tagline: {
      fr: "Indispensables maison introuvables au Canada",
      en: "Hard-to-find home essentials in Canada",
      de: "Schwer auffindbare Haushaltshelfer in Kanada",
      es: "Esenciales del hogar difíciles de encontrar en Canadá",
    },
    service: {
      fr: "Service client disponible",
      en: "Customer service available",
      de: "Kundendienst verfügbar",
      es: "Atención al cliente disponible",
    },
    company: { fr: "COMPAGNIE", en: "COMPANY", de: "UNTERNEHMEN", es: "EMPRESA" },
    about: {
      fr: "À propos",
      en: "About",
      de: "Über uns",
      es: "Quiénes somos",
    },
    contact: { fr: "Contact", en: "Contact", de: "Kontakt", es: "Contacto" },
    help: { fr: "AIDE", en: "HELP", de: "HILFE", es: "AYUDA" },
    customerService: {
      fr: "Service client",
      en: "Customer service",
      de: "Kundendienst",
      es: "Servicio al cliente",
    },
    myAccount: {
      fr: "Mon compte",
      en: "My account",
      de: "Mein Konto",
      es: "Mi cuenta",
    },
    legal: {
      fr: "Mentions légales",
      en: "Legal notice",
      de: "Rechtliche Hinweise",
      es: "Aviso legal",
    },
    newsletter: {
      fr: "INFOLETTRE",
      en: "NEWSLETTER",
      de: "NEWSLETTER",
      es: "BOLETÍN",
    },
    newsletterText: {
      fr: "Soyez le premier à recevoir les dernières nouvelles sur les tendances, promotions et bien plus encore !",
      en: "Be the first to receive news about trends, promotions and more!",
      de: "Erhalten Sie als Erste Neuigkeiten zu Trends, Angeboten und vielem mehr.",
      es: "Sé el primero en recibir noticias sobre tendencias, promociones y mucho más.",
    },
    emailPlaceholder: {
      fr: "Votre adresse courriel",
      en: "Your email address",
      de: "Ihre E-Mail-Adresse",
      es: "Tu correo electrónico",
    },
    signUp: {
      fr: "S'inscrire",
      en: "Sign up",
      de: "Anmelden",
      es: "Suscribirse",
    },
    securePayments: {
      fr: "Paiements sécurisés",
      en: "Secure payments",
      de: "Sichere Zahlungen",
      es: "Pagos seguros",
    },
    language: { fr: "Langue", en: "Language", de: "Sprache", es: "Idioma" },
    createdBy: { fr: "créé par", en: "created by", de: "erstellt von", es: "creado por" },
    seoKeywords: {
      fr: (
        <>
          <strong>Anti-courants d'air:</strong> bas de porte, joints d'etancheite, accessoires isolation Canada.{" "}
          <strong>Cuisine:</strong> degraissant intensif, nettoyants specialises, accessoires pratiques.{" "}
          <strong>Salle de bain:</strong> anti-calcaire, traitement joints et moisissures, accessoires utiles.
        </>
      ),
      en: (
        <>
          <strong>Draft proofing:</strong> door draft stopper, weather stripping, home insulation accessories Canada.{" "}
          <strong>Kitchen:</strong> heavy-duty degreaser, specialty kitchen cleaner, safe scraper tools.{" "}
          <strong>Bathroom:</strong> anti-limescale cleaner, grout and mold treatment, useful bathroom accessories.
        </>
      ),
      de: (
        <>
          <strong>Zugluftschutz:</strong> Türzugstopper, Dichtungsbänder und Isolationszubehör in Kanada.{" "}
          <strong>Küche:</strong> starker Fettlöser, Spezialreiniger und sichere Schaber.{" "}
          <strong>Bad:</strong> Kalkreiniger, Fugen-/Schimmelpflege und nützliches Zubehör.
        </>
      ),
      es: (
        <>
          <strong>Anti corrientes de aire:</strong> burletes, sellos y accesorios de aislamiento en Canadá.{" "}
          <strong>Cocina:</strong> desengrasante intensivo, limpiadores especializados y raspadores seguros.{" "}
          <strong>Baño:</strong> antisarro, tratamiento de juntas/moho y accesorios útiles.
        </>
      ),
    },
  };

  return (
    <footer
      id="footer"
      className="footer footer_type_2"
      style={{ backgroundColor: "#f5f5f5", borderTop: "1px solid #e0e0e0" }}
    >
      <div
        className="footer-middle container"
        style={{ paddingTop: "3rem", paddingBottom: "2rem" }}
      >
        <div className="row">
          <div className="footer-column col-lg-3 col-md-6 mb-4 mb-lg-0">
            <div
              className="mb-3"
              style={{
                backgroundColor: "#fff",
                padding: "0.5rem",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              <Image
                src="/assets/images/touski-logo.jpeg"
                width={120}
                height={120}
                alt="Touski"
                style={{ width: "120px", height: "auto" }}
              />
            </div>
            <p className="mb-3" style={{ fontSize: "0.9rem" }}>
              {getLocaleValue(ui.tagline, locale)}
            </p>
            <p className="mb-2" style={{ fontSize: "0.85rem" }}>
              <strong>contact@touski.online</strong>
            </p>
            <p style={{ fontSize: "0.85rem" }}>
              <strong>{getLocaleValue(ui.service, locale)}</strong>
            </p>

            <ul className="social-links list-unstyled d-flex gap-2 mb-0 mt-3">
              {socialLinks.slice(0, 5).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="footer__social-link d-block"
                    style={{ color: "#333" }}
                  >
                    <svg
                      className={link.className}
                      width={link.width}
                      height={link.height}
                      viewBox={link.viewBox}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {typeof link.icon === "string" ? <use href={link.icon} /> : link.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase mb-3">
              {getLocaleValue(ui.company, locale)}
            </h6>
            <ul className="sub-menu__list list-unstyled">
              <li className="sub-menu__item mb-2">
                <Link href={withLocale("/about", locale)} className="menu-link menu-link_us-s">
                  {getLocaleValue(ui.about, locale)}
                </Link>
              </li>
              <li className="sub-menu__item mb-2">
                <Link
                  href={withLocale("/contact", locale)}
                  className="menu-link menu-link_us-s"
                >
                  {getLocaleValue(ui.contact, locale)}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase mb-3">
              {getLocaleValue(ui.help, locale)}
            </h6>
            <ul className="sub-menu__list list-unstyled">
              <li className="sub-menu__item mb-2">
                <Link
                  href={withLocale("/contact", locale)}
                  className="menu-link menu-link_us-s"
                >
                  {getLocaleValue(ui.customerService, locale)}
                </Link>
              </li>
              <li className="sub-menu__item mb-2">
                <Link href="/account_dashboard" className="menu-link menu-link_us-s">
                  {getLocaleValue(ui.myAccount, locale)}
                </Link>
              </li>
              <li className="sub-menu__item mb-2">
                <Link href="/legal" className="menu-link menu-link_us-s">
                  {getLocaleValue(ui.legal, locale)}
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column col-lg-3 col-md-6">
            <h6 className="sub-menu__title text-uppercase mb-3">
              {getLocaleValue(ui.newsletter, locale)}
            </h6>
            <p className="mb-3" style={{ fontSize: "0.85rem" }}>
              {getLocaleValue(ui.newsletterText, locale)}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder={getLocaleValue(ui.emailPlaceholder, locale)}
                  style={{ fontSize: "0.85rem" }}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{
                    backgroundColor: "#FF9445",
                    border: "none",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  {getLocaleValue(ui.signUp, locale)}
                </button>
              </div>
            </form>

            <h6 className="mb-2" style={{ fontSize: "0.85rem", fontWeight: "600" }}>
              {getLocaleValue(ui.securePayments, locale)}
            </h6>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <div
                style={{
                  width: "50px",
                  height: "32px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#FF6000" />
                  <text x="24" y="20" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">
                    DISCOVER
                  </text>
                </svg>
              </div>
              <div
                style={{
                  width: "50px",
                  height: "32px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <svg width="40" height="24" viewBox="0 0 48 32">
                  <circle cx="18" cy="16" r="10" fill="#EB001B" />
                  <circle cx="30" cy="16" r="10" fill="#F79E1B" />
                  <path
                    d="M24 8c-2.2 1.8-3.6 4.5-3.6 7.5s1.4 5.7 3.6 7.5c2.2-1.8 3.6-4.5 3.6-7.5S26.2 9.8 24 8z"
                    fill="#FF5F00"
                  />
                </svg>
              </div>
              <div
                style={{
                  width: "50px",
                  height: "32px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <text x="24" y="20" fontSize="10" fontWeight="700" fill="#003087" textAnchor="middle">
                    PayPal
                  </text>
                </svg>
              </div>
              <div
                style={{
                  width: "50px",
                  height: "32px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#006FCF" />
                  <text x="24" y="20" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">
                    AMEX
                  </text>
                </svg>
              </div>
              <div
                style={{
                  width: "50px",
                  height: "32px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <text
                    x="24"
                    y="20"
                    fontSize="11"
                    fontWeight="700"
                    fill="#1A1F71"
                    textAnchor="middle"
                    fontStyle="italic"
                  >
                    VISA
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="footer-bottom"
        style={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <span className="footer-copyright" style={{ fontSize: "0.85rem" }}>
                ©{new Date().getFullYear()} TOUSKI - {getLocaleValue(ui.tagline, locale)}
              </span>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end align-items-center gap-3">
                <span style={{ fontSize: "0.85rem" }}>
                  {getLocaleValue(ui.language, locale)}
                </span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "auto", fontSize: "0.85rem" }}
                  name="store-language"
                  value={locale}
                  onChange={handleLanguageChange}
                >
                  {languageOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>

                <span style={{ fontSize: "0.85rem" }}>
                  {getLocaleValue(ui.createdBy, locale)}{" "}
                  <a
                    href="https://o7digital.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#FF9445", textDecoration: "none", fontWeight: "600" }}
                  >
                    o7Digital
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <div style={{ fontSize: "0.7rem", color: "#666", lineHeight: "1.5" }}>
                {getLocaleValue(ui.seoKeywords, locale)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
