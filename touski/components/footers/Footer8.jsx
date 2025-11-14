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

          {/* COMPANY */}
          <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase mb-3">COMPANY</h6>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks1.map((elm, i) => (
                <li key={i} className="sub-menu__item mb-2">
                  <Link href={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SHOP */}
          <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
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
          </div>

          {/* HELP */}
          <div className="footer-column col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase mb-3">HELP</h6>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks3.map((elm, i) => (
                <li key={i} className="sub-menu__item mb-2">
                  <Link href={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div className="footer-column col-lg-3 col-md-6">
            <h6 className="sub-menu__title text-uppercase mb-3">SUBSCRIBE</h6>
            <p className="mb-3" style={{fontSize: '0.85rem'}}>
              Be the first to get the latest news about trends, promotions, and much more!
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  style={{fontSize: '0.85rem'}}
                />
                <button className="btn btn-primary" type="submit" style={{backgroundColor: '#FF9445', border: 'none', color: '#fff', fontWeight: '600'}}>
                  Submit
                </button>
              </div>
            </form>
            
            <h6 className="mb-2" style={{fontSize: '0.85rem', fontWeight: '600'}}>Secure payments</h6>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <Image src="/assets/images/payment-options/discover.png" alt="Discover" width={40} height={25} style={{objectFit: 'contain'}} />
              <Image src="/assets/images/payment-options/mastercard.png" alt="Mastercard" width={40} height={25} style={{objectFit: 'contain'}} />
              <Image src="/assets/images/payment-options/paypal.png" alt="PayPal" width={40} height={25} style={{objectFit: 'contain'}} />
              <Image src="/assets/images/payment-options/stripe.png" alt="Amex" width={40} height={25} style={{objectFit: 'contain'}} />
              <Image src="/assets/images/payment-options/visa.png" alt="Visa" width={40} height={25} style={{objectFit: 'contain'}} />
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
                
                <span style={{fontSize: '0.85rem'}}>Currency</span>
                <select
                  className="form-select form-select-sm"
                  style={{width: 'auto', fontSize: '0.85rem'}}
                  name="store-currency"
                >
                  {currencyOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
