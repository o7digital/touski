import React from "react";

export default function Delivery() {
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
            <h5 className="modal-title">Livraison Canada</h5>
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
                <h6>Livraison standard Canada (3-7 jours ouvrables)</h6>
                <span className="third-color">Gratuite dès 140 $ CAD</span>
              </div>
              <p>
                Livraison partout au Canada. Les commandes sous 140 $ CAD sont
                calculées automatiquement à la caisse selon la province.
              </p>

              <div className="d-flex align-items-center justify-content-between">
                <h6>Traitement de commande</h6>
                <span>24-48 h</span>
              </div>
              <p>
                Les commandes sont préparées du lundi au vendredi. Un numéro de
                suivi est envoyé par courriel dès l'expédition.
              </p>

              <div className="d-flex align-items-center justify-content-between">
                <h6>Retours</h6>
                <span>30 jours</span>
              </div>
              <p>
                Retour accepté sous 30 jours pour les produits non utilisés, dans
                leur état d'origine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
