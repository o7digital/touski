"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function NewsLetter() {
  const modalElement = useRef();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Vérifier si on est côté client
    if (typeof window === 'undefined') return;
    
    // Vérifier si l'utilisateur a déjà fermé la popup
    const hasClosedNewsletter = localStorage.getItem('newsletterClosed');
    
    if (hasClosedNewsletter) {
      // Ne pas afficher la popup si déjà fermée
      return;
    }

    // Afficher la popup
    setShouldShow(true);
    
    const bootstrap = require("bootstrap");
    
    // S'assurer que l'élément existe avant de créer le modal
    const popupElement = document.getElementById("newsletterPopup");
    if (!popupElement) return;
    
    const myModal = new bootstrap.Modal(popupElement, {
      keyboard: false,
    });

    myModal.show();
    
    // Sauvegarder quand l'utilisateur ferme la popup
    const handleHidden = () => {
      localStorage.setItem('newsletterClosed', 'true');
      myModal.hide();
    };
    
    modalElement.current?.addEventListener("hidden.bs.modal", handleHidden);
    
    return () => {
      modalElement.current?.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, []);

  // Ne pas rendre le modal si l'utilisateur l'a déjà fermé
  if (!shouldShow) {
    return null;
  }

  return (
    <div
      className="modal fade"
      id="newsletterPopup"
      ref={modalElement}
      tabIndex="-1"
      data-bs-backdrop={"true"}
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
                  width={450}
                  height={550}
                  style={{ height: "fit-content" }}
                  loading="lazy"
                  src="/assets/images/girls.jpg"
                  className="h-100 w-100 object-fit-cover d-block"
                  alt="Newsletter lifestyle"
                />
              </div>
            </div>
            <div className="col-md-6 p-0 d-flex align-items-center">
              <div className="block-newsletter w-100">
                <h3 className="block__title">Inscrivez-vous à notre infolettre</h3>
                <p>
                  Soyez le premier à recevoir les dernières nouvelles sur les tendances, promotions,
                  et bien plus encore !
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="footer-newsletter__form position-relative bg-body"
                >
                  <input
                    className="form-control border-2"
                    type="email"
                    name="email"
                    placeholder="Votre adresse courriel"
                  />
                  <input
                    className="btn-link fw-medium bg-transparent position-absolute top-0 end-0 h-100"
                    type="submit"
                    defaultValue="S'INSCRIRE"
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
