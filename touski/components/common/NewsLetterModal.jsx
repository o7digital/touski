"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocaleValue } from "@/lib/i18n";

export default function NewsLetterModal() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");

  const ui = {
    title: {
      fr: "Inscrivez-vous à notre infolettre",
      en: "Subscribe to our newsletter",
      de: "Abonnieren Sie unseren Newsletter",
      es: "Suscríbete a nuestro boletín",
    },
    description: {
      fr: "Soyez le premier à recevoir les dernières nouvelles sur les tendances, promotions, et bien plus encore !",
      en: "Be the first to receive the latest news about trends, promotions, and much more!",
      de: "Erhalten Sie als Erste Neuigkeiten zu Trends, Angeboten und vielem mehr!",
      es: "Sé el primero en recibir las últimas novedades sobre tendencias, promociones y mucho más.",
    },
    emailPlaceholder: {
      fr: "Votre adresse courriel",
      en: "Your email address",
      de: "Ihre E-Mail-Adresse",
      es: "Tu correo electrónico",
    },
    submit: {
      fr: "S'INSCRIRE",
      en: "SIGN UP",
      de: "ANMELDEN",
      es: "SUSCRIBIRSE",
    },
  };

  return (
    <div
      className="modal fade"
      id="newsletterPopup"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog newsletter-popup modal-dialog-centered">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div className="row p-0 m-0">
            <div className="col-md-6 p-0 d-none d-md-block">
              <div className="newsletter-popup__bg h-100 w-100">
                <Image
                  loading="lazy"
                  width={450}
                  height={550}
                  src="/assets/images/girls.jpg"
                  className="h-100 w-100 object-fit-cover d-block"
                  alt="Newsletter lifestyle"
                />
              </div>
            </div>
            <div className="col-md-6 p-0 d-flex align-items-center">
              <div className="block-newsletter w-100">
                <h3 className="block__title">{getLocaleValue(ui.title, locale)}</h3>
                <p>{getLocaleValue(ui.description, locale)}</p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="footer-newsletter__form position-relative bg-body"
                >
                  <input
                    className="form-control border-2"
                    type="email"
                    name="email"
                    placeholder={getLocaleValue(ui.emailPlaceholder, locale)}
                  />
                  <input
                    className="btn-link fw-medium bg-transparent position-absolute top-0 end-0 h-100"
                    type="submit"
                    defaultValue={getLocaleValue(ui.submit, locale)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
