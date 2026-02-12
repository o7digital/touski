"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocaleValue } from "@/lib/i18n";

export default function Delivery() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");

  return (
    <div
      className="modal fade"
      id="deliveryModal"
      tabIndex="-1"
      aria-labelledby="deliveryModal"
      aria-hidden="true"
    >
      <div className="modal-dialog delivery-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {getLocaleValue(
                {
                  fr: "Livraison Canada",
                  en: "Canada shipping",
                  de: "Versand in Kanada",
                  es: "Envío en Canadá",
                },
                locale
              )}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="delivery-modal__wrapper">
              <div className="d-flex align-items-center justify-content-between">
                <h6>
                  {getLocaleValue(
                    {
                      fr: "Livraison standard Canada (3-7 jours ouvrables)",
                      en: "Standard shipping Canada (3-7 business days)",
                      de: "Standardversand Kanada (3-7 Werktage)",
                      es: "Envío estándar Canadá (3-7 días hábiles)",
                    },
                    locale
                  )}
                </h6>
                <span className="third-color">
                  {getLocaleValue(
                    {
                      fr: "Gratuite dès 140 $ CAD",
                      en: "Free from $140 CAD",
                      de: "Kostenlos ab 140 CAD",
                      es: "Gratis desde 140 CAD",
                    },
                    locale
                  )}
                </span>
              </div>
              <p>
                {getLocaleValue(
                  {
                    fr: "Livraison partout au Canada. Les commandes sous 140 $ CAD sont calculees automatiquement a la caisse selon la province.",
                    en: "Shipping across Canada. Orders below $140 CAD are calculated automatically at checkout by province.",
                    de: "Versand in ganz Kanada. Bestellungen unter 140 CAD werden an der Kasse je nach Provinz automatisch berechnet.",
                    es: "Envío a todo Canadá. Los pedidos inferiores a 140 CAD se calculan automáticamente en el checkout según la provincia.",
                  },
                  locale
                )}
              </p>

              <div className="d-flex align-items-center justify-content-between">
                <h6>
                  {getLocaleValue(
                    {
                      fr: "Traitement de commande",
                      en: "Order processing",
                      de: "Bestellbearbeitung",
                      es: "Procesamiento del pedido",
                    },
                    locale
                  )}
                </h6>
                <span>24-48 h</span>
              </div>
              <p>
                {getLocaleValue(
                  {
                    fr: "Les commandes sont preparees du lundi au vendredi. Un numero de suivi est envoye par courriel des l'expedition.",
                    en: "Orders are prepared Monday to Friday. A tracking number is sent by email as soon as the parcel is shipped.",
                    de: "Bestellungen werden von Montag bis Freitag vorbereitet. Eine Sendungsnummer wird nach dem Versand per E-Mail gesendet.",
                    es: "Los pedidos se preparan de lunes a viernes. Se envía un número de seguimiento por correo electrónico al despacharse.",
                  },
                  locale
                )}
              </p>

              <div className="d-flex align-items-center justify-content-between">
                <h6>
                  {getLocaleValue(
                    {
                      fr: "Retours",
                      en: "Returns",
                      de: "Rücksendungen",
                      es: "Devoluciones",
                    },
                    locale
                  )}
                </h6>
                <span>30 jours</span>
              </div>
              <p>
                {getLocaleValue(
                  {
                    fr: "Retour accepte sous 30 jours pour les produits non utilises, dans leur etat d'origine.",
                    en: "Returns accepted within 30 days for unused products in original condition.",
                    de: "Rückgabe innerhalb von 30 Tagen für unbenutzte Produkte im Originalzustand.",
                    es: "Devolución aceptada dentro de 30 días para productos sin usar y en su estado original.",
                  },
                  locale
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
