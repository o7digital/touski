import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocaleValue, withLocale } from "@/lib/i18n";

export default function MobileFooter1() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setShowFooter(true);
  }, []);

  return (
    <footer
      className={`footer-mobile container w-100 px-5 d-md-none bg-body ${
        showFooter ? "position-fixed footer-mobile_initialized" : ""
      }`}
    >
      <div className="row text-center">
        <div className="col-4">
          <Link
            href={withLocale("/", locale)}
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_home" />
            </svg>
            <span>
              {getLocaleValue(
                { fr: "Accueil", en: "Home", de: "Start", es: "Inicio" },
                locale
              )}
            </span>
          </Link>
        </div>

        <div className="col-4">
          <Link
            href={withLocale("/products", locale)}
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_hanger" />
            </svg>
            <span>
              {getLocaleValue(
                { fr: "Boutique", en: "Shop", de: "Shop", es: "Tienda" },
                locale
              )}
            </span>
          </Link>
        </div>

        <div className="col-4">
          <Link
            href={withLocale("/contact", locale)}
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_headphone" />
            </svg>
            <span>
              {getLocaleValue(
                { fr: "Contact", en: "Contact", de: "Kontakt", es: "Contacto" },
                locale
              )}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
