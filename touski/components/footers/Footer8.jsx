"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  currencyOptions,
  footerLinks1,
  footerLinks2,
  footerLinks3,
  languageOptions,
  socialLinks,
} from "@/data/footer";

export default function Footer8() {
  return (
    <footer id="footer" className="footer footer_type_2" style={{backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0'}}>
      <div className="footer-middle container" style={{paddingTop: '3rem', paddingBottom: '2rem'}}>
        <div className="row">
          {/* Logo et infos */}
          <div className="footer-column col-lg-3 col-md-6 mb-4 mb-lg-0">
            <div className="mb-3" style={{backgroundColor: '#fff', padding: '0.5rem', borderRadius: '8px', display: 'inline-block'}}>
              <Image
                src="/assets/images/touski-logo.jpeg"
                width={120}
                height={120}
                alt="Touski"
                style={{width: '120px', height: 'auto'}}
              />
            </div>
            <p className="mb-3" style={{fontSize: '0.9rem'}}>
              Tout ce qui est nécessaire pour son chez-soi
            </p>
            <p className="mb-2" style={{fontSize: '0.85rem'}}>
              <strong>contact@touski.online</strong>
            </p>
            <p style={{fontSize: '0.85rem'}}>
              <strong>Service client disponible</strong>
            </p>

            <ul className="social-links list-unstyled d-flex gap-2 mb-0 mt-3">
              {socialLinks.slice(0, 5).map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer__social-link d-block" style={{color: '#333'}}>
                    <svg
                      className={link.className}
                      width={link.width}
                      height={link.height}
                      viewBox={link.viewBox}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {typeof link.icon === "string" ? (
                        <use href={link.icon} />
                      ) : (
                        link.icon
                      )}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPAGNIE */}
          <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase mb-3">COMPAGNIE</h6>
            <ul className="sub-menu__list list-unstyled">
              <li className="sub-menu__item mb-2">
                <Link href="/about" className="menu-link menu-link_us-s">
                  À propos
                </Link>
              </li>
              <li className="sub-menu__item mb-2">
                <Link href="/contact" className="menu-link menu-link_us-s">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SHOP - Caché */}
          {/* <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase mb-3">SHOP</h6>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks2.map((elm, i) => (
                <li key={i} className="sub-menu__item mb-2">
                  <Link href={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* AIDE */}
          <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase mb-3">AIDE</h6>
            <ul className="sub-menu__list list-unstyled">
              <li className="sub-menu__item mb-2">
                <Link href="/contact" className="menu-link menu-link_us-s">
                  Service client
                </Link>
              </li>
              <li className="sub-menu__item mb-2">
                <Link href="/account_dashboard" className="menu-link menu-link_us-s">
                  Mon compte
                </Link>
              </li>
              <li className="sub-menu__item mb-2">
                <Link href="/terms" className="menu-link menu-link_us-s">
                  Politiques de Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* INFOLETTRE */}
          <div className="footer-column col-lg-3 col-md-6">
            <h6 className="sub-menu__title text-uppercase mb-3">INFOLETTRE</h6>
            <p className="mb-3" style={{fontSize: '0.85rem'}}>
              Soyez le premier à recevoir les dernières nouvelles sur les tendances, promotions et bien plus encore !
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Votre adresse courriel"
                  style={{fontSize: '0.85rem'}}
                />
                <button className="btn btn-primary" type="submit" style={{backgroundColor: '#FF9445', border: 'none', color: '#fff', fontWeight: '600'}}>
                  S'inscrire
                </button>
              </div>
            </form>
            
            <h6 className="mb-2" style={{fontSize: '0.85rem', fontWeight: '600'}}>Secure payments</h6>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              {/* Discover */}
              <div style={{width: '50px', height: '32px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#FF6000"/>
                  <text x="24" y="20" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">DISCOVER</text>
                </svg>
              </div>
              {/* Mastercard */}
              <div style={{width: '50px', height: '32px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
                <svg width="40" height="24" viewBox="0 0 48 32">
                  <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                  <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                  <path d="M24 8c-2.2 1.8-3.6 4.5-3.6 7.5s1.4 5.7 3.6 7.5c2.2-1.8 3.6-4.5 3.6-7.5S26.2 9.8 24 8z" fill="#FF5F00"/>
                </svg>
              </div>
              {/* PayPal */}
              <div style={{width: '50px', height: '32px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <text x="24" y="20" fontSize="10" fontWeight="700" fill="#003087" textAnchor="middle">PayPal</text>
                </svg>
              </div>
              {/* Amex */}
              <div style={{width: '50px', height: '32px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#006FCF"/>
                  <text x="24" y="20" fontSize="10" fontWeight="700" fill="white" textAnchor="middle">AMEX</text>
                </svg>
              </div>
              {/* Visa */}
              <div style={{width: '50px', height: '32px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'}}>
                <svg width="40" height="24" viewBox="0 0 48 32" fill="none">
                  <text x="24" y="20" fontSize="11" fontWeight="700" fill="#1A1F71" textAnchor="middle" fontStyle="italic">VISA</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem', paddingBottom: '1.5rem', backgroundColor: '#f5f5f5'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <span className="footer-copyright" style={{fontSize: '0.85rem'}}>
                ©{new Date().getFullYear()} TOUSKI - Tout ce qui est nécessaire pour son chez-soi
              </span>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end align-items-center gap-3">
                <span style={{fontSize: '0.85rem'}}>Language</span>
                <select
                  className="form-select form-select-sm"
                  style={{width: 'auto', fontSize: '0.85rem'}}
                  name="store-language"
                >
                  {languageOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                
                <span style={{fontSize: '0.85rem'}}>créé par <a href="https://o7digital.com" target="_blank" rel="noopener noreferrer" style={{color: '#FF9445', textDecoration: 'none', fontWeight: '600'}}>o7Digital</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
