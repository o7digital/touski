"use client";
import { currencyOptions, languageOptions } from "@/data/footer";
import { socialLinks } from "@/data/socials";
import React, { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import MobileNav from "./components/MobileNav";
import Image from "next/image";
import {
  getLocaleFromPathname,
  getLocaleValue,
  switchLocalePath,
  withLocale,
} from "@/lib/i18n";

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname || "/");

  const handleLanguageChange = (event) => {
    const targetLocale = event.target.value;
    const targetPath = switchLocalePath(pathname || "/", targetLocale);

    if (typeof document !== "undefined") {
      document.cookie = `touski-lang=${targetLocale}; path=/; max-age=${
        60 * 60 * 24 * 365
      }`;
    }

    if (targetPath !== pathname) {
      router.push(targetPath);
    }
  };

  return (
    <div className="header-mobile header_sticky header_sticky-active">
      <div
        className="text-center py-1"
        style={{ backgroundColor: "#f6f6f6", fontSize: 12, fontWeight: 500 }}
      >
        {getLocaleValue(
          {
            fr: "Livraison gratuite partout au Canada des 140 $ CAD",
            en: "Free shipping across Canada on orders over $140 CAD",
            de: "Kostenloser Versand in ganz Kanada ab 140 CAD",
            es: "Envío gratis en todo Canadá en pedidos desde 140 CAD",
          },
          locale
        )}
      </div>

      <div className="container d-flex align-items-center h-100">
        <a className="mobile-nav-activator d-block position-relative" href="#">
          <svg
            className="nav-icon"
            width="25"
            height="18"
            viewBox="0 0 25 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_nav" />
          </svg>
          <span className="btn-close-lg position-absolute top-0 start-0 w-100"></span>
        </a>

        <div className="logo">
          <a href={withLocale("/", locale)}>
            <Image
              src="/assets/images/touski-logo.jpeg"
              width={448}
              height={448}
              alt="Touski"
              className="logo__image d-block"
              style={{ height: 112, width: "auto", maxHeight: "none" }}
            />
          </a>
        </div>
      </div>

      <nav className="header-mobile__navigation navigation d-flex flex-column w-100 position-absolute top-100 bg-body overflow-auto">
        <div className="container">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="search-field position-relative mt-4 mb-3"
          >
            <div className="position-relative">
              <input
                className="search-field__input w-100 border rounded-1"
                type="text"
                name="search-keyword"
                placeholder={getLocaleValue(
                  {
                    fr: "Rechercher un produit",
                    en: "Search products",
                    de: "Produkte suchen",
                    es: "Buscar productos",
                  },
                  locale
                )}
              />
              <button
                className="btn-icon search-popup__submit pb-0 me-2"
                type="submit"
              >
                <svg
                  className="d-block"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_search" />
                </svg>
              </button>
              <button
                className="btn-icon btn-close-lg search-popup__reset pb-0 me-2"
                type="reset"
              ></button>
            </div>

            <div className="position-absolute start-0 top-100 m-0 w-100">
              <div className="search-result"></div>
            </div>
          </form>
        </div>

        <div className="container">
          <div className="overflow-hidden">
            <ul className="navigation__list list-unstyled position-relative">
              <Suspense fallback={null}>
                <MobileNav />
              </Suspense>
            </ul>
          </div>
        </div>

        <div className="border-top mt-auto pb-2">
          <div className="customer-links container mt-4 mb-2 pb-1">
            <svg
              className="d-inline-block align-middle"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_user" />
            </svg>
            <span className="d-inline-block ms-2 text-uppercase align-middle fw-medium">
              {getLocaleValue(
                {
                  fr: "Mon compte",
                  en: "My Account",
                  de: "Mein Konto",
                  es: "Mi cuenta",
                },
                locale
              )}
            </span>
          </div>

          <div className="container d-flex align-items-center">
            <label className="me-2 text-secondary">
              {getLocaleValue(
                {
                  fr: "Langue",
                  en: "Language",
                  de: "Sprache",
                  es: "Idioma",
                },
                locale
              )}
            </label>
            <select
              className="form-select form-select-sm bg-transparent border-0"
              aria-label="Language"
              name="store-language"
              value={locale}
              onChange={handleLanguageChange}
            >
              {languageOptions.map((option, index) => (
                <option
                  key={index}
                  className="footer-select__option"
                  value={option.value}
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <div className="container d-flex align-items-center">
            <label className="me-2 text-secondary">
              {getLocaleValue(
                {
                  fr: "Devise",
                  en: "Currency",
                  de: "Währung",
                  es: "Moneda",
                },
                locale
              )}
            </label>
            <select
              className="form-select form-select-sm bg-transparent border-0"
              aria-label="Currency"
              name="store-currency"
              defaultValue=""
            >
              {currencyOptions.map((option, index) => (
                <option
                  key={index}
                  className="footer-select__option"
                  value={option.value}
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <ul className="container social-links list-unstyled d-flex flex-wrap mb-0">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="footer__social-link d-block color-white"
                >
                  <svg
                    className={link.className}
                    width={link.width}
                    height={link.height}
                    viewBox={link.viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href={link.icon} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
