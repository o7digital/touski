import React from "react";

export default function Terms() {
  return (
    <>
      {/* Logo FIXE en arrière-plan - reste au centre pendant le scroll */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          backgroundImage: 'url(/assets/touski.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.40,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      <section className="container mw-930 lh-30 position-relative" style={{ zIndex: 1 }}>
      
      {/* Contenu avec position relative pour passer par-dessus le logo */}
      <div className="position-relative" style={{ zIndex: 1 }}>
        <h1 className="section-title text-uppercase fw-bold mb-3 text-center" style={{color: '#ff6b35'}}>
          Politique de Confidentialité
        </h1>
      
      <div className="text-center mb-5">
        <p className="mb-1"><strong>9517-6806 Québec inc. (TOUSKI)</strong></p>
        <p className="mb-1">1030, Avenue Muguette, St-Élie-de-Caxton, QC, G0X 2N0, Canada</p>
        <p className="mb-1">
          <a href="mailto:info@touski.online">info@touski.online</a>
        </p>
        <p className="text-muted"><em>Dernière mise à jour : Novembre 2025</em></p>
      </div>

      <div className="privacy-content">
        <h2 className="h4 fw-bold mb-3 mt-5">1. Introduction</h2>
        <p className="mb-4">
          La société <strong>TOUSKI / 9517-6806 Québec inc.</strong> (« <strong>TOUSKI</strong> », « <strong>nous</strong> ») 
          s'engage à protéger la confidentialité, la sécurité et l'intégrité des renseignements personnels des utilisateurs 
          de son site Web <a href="https://www.touski.online" target="_blank" rel="noopener">www.touski.online</a> et de ses services associés.
        </p>
        <p className="mb-4">
          Le présent <strong>Avis de Confidentialité</strong> explique quelles données nous recueillons, comment nous les utilisons, 
          avec qui nous les partageons, ainsi que vos droits conformément :
        </p>
        <ul className="mb-4">
          <li>à la <strong>Loi 25 du Québec</strong> et la <strong>LPRPDE</strong> (Canada)</li>
          <li>au <strong>Règlement Général sur la Protection des Données (RGPD)</strong> de l'Union Européenne</li>
          <li>au <strong>CCPA/CPRA</strong> (Californie / États-Unis)</li>
          <li>à la <strong>Ley Federal de Protección de Datos Personales (ARCO – Mexique)</strong></li>
          <li>aux autres législations applicables en matière de protection des données.</li>
        </ul>
        <p className="mb-4">
          En utilisant notre site, vous acceptez les pratiques décrites dans le présent avis.
        </p>

        <h2 className="h4 fw-bold mb-3 mt-5">2. Renseignements personnels collectés</h2>
        <p className="mb-3">Nous pouvons recueillir les catégories suivantes :</p>

        <h3 className="h6 fw-bold mb-2 mt-4">2.1. Informations d'identification</h3>
        <ul className="mb-3">
          <li>Nom, prénom</li>
          <li>Adresse postale</li>
          <li>Adresse courriel</li>
          <li>Numéro de téléphone</li>
        </ul>

        <h3 className="h6 fw-bold mb-2 mt-4">2.2. Informations liées aux transactions</h3>
        <ul className="mb-3">
          <li>Produits achetés</li>
          <li>Historique de commandes</li>
          <li>Adresse de livraison et de facturation</li>
          <li>Informations de paiement (gérées uniquement par nos fournisseurs de paiement sécurisés — nous ne stockons jamais vos informations bancaires)</li>
        </ul>

        <h3 className="h6 fw-bold mb-2 mt-4">2.3. Informations techniques</h3>
        <ul className="mb-3">
          <li>Adresse IP</li>
          <li>Type d'appareil</li>
          <li>Navigateur</li>
          <li>Données de géolocalisation approximative</li>
          <li>Journaux du serveur</li>
          <li>Cookies et technologies similaires (voir section 8)</li>
        </ul>

        <h3 className="h6 fw-bold mb-2 mt-4">2.4. Informations relatives au compte utilisateur</h3>
        <ul className="mb-3">
          <li>Identifiants</li>
          <li>Préférences</li>
          <li>Langues</li>
          <li>Communication marketing</li>
        </ul>

        <h3 className="h6 fw-bold mb-2 mt-4">2.5. Informations fournies volontairement</h3>
        <ul className="mb-4">
          <li>Formulaires de contact</li>
          <li>Commentaires</li>
          <li>Réponses à des sondages</li>
          <li>Support client</li>
        </ul>

        <h2 className="h4 fw-bold mb-3 mt-5">3. Finalités de la collecte</h2>
        <p className="mb-3">Nous utilisons les données pour les finalités suivantes :</p>
        <ul className="mb-4">
          <li>Création et gestion de votre compte utilisateur</li>
          <li>Traitement des commandes et livraisons</li>
          <li>Facturation et paiements</li>
          <li>Gestion des retours et service après-vente</li>
          <li>Communication marketing (avec consentement)</li>
          <li>Amélioration du site Web et de l'expérience utilisateur</li>
          <li>Prévention des fraudes</li>
          <li>Respect des obligations légales et fiscales</li>
          <li>Analyse statistique et optimisation des ventes</li>
        </ul>

        <h2 className="h4 fw-bold mb-3 mt-5">4. Fondements légaux (RGPD)</h2>
        <p className="mb-3">Selon le RGPD, la collecte repose sur :</p>
        <ul className="mb-4">
          <li><strong>Le consentement</strong> (cookies non essentiels, marketing)</li>
          <li><strong>L'exécution d'un contrat</strong> (achats, livraison)</li>
          <li><strong>L'intérêt légitime</strong> (amélioration de nos services, prévention des fraudes)</li>
          <li><strong>Le respect d'obligations légales</strong> (fiscalité, comptabilité)</li>
        </ul>

        <h2 className="h4 fw-bold mb-3 mt-5">5. Partage et transfert des données</h2>
        <p className="mb-3">Nous pouvons partager les données uniquement avec :</p>
        <ul className="mb-4">
          <li>Prestataires de paiement (Stripe, PayPal, etc.)</li>
          <li>Plateformes de logistique et de livraison</li>
          <li>Fournisseurs de services (hébergement, support technique, email marketing)</li>
          <li>Autorités gouvernementales (si requis par loi)</li>
        </ul>
        <p className="mb-4">
          Les données peuvent être transférées à l'extérieur du Québec, du Canada ou vers des pays tiers conformément 
          aux exigences du <strong>RGPD</strong>, de la <strong>Loi 25</strong>, du <strong>CCPA</strong> et de la <strong>Loi mexicaine ARCO</strong>.
          Tous les sous-traitants doivent appliquer des garanties de sécurité équivalentes.
        </p>

        <h2 className="h4 fw-bold mb-3 mt-5">6. Conservation des données</h2>
        <p className="mb-3">Nous conservons vos données :</p>
        <ul className="mb-4">
          <li>pendant la durée nécessaire à la prestation du service</li>
          <li>pendant les délais légaux applicables en matière fiscale et commerciale</li>
          <li>ou jusqu'à la suppression de votre compte (si applicable)</li>
        </ul>

        <h2 className="h4 fw-bold mb-3 mt-5">7. Vos droits</h2>

        <h3 className="h6 fw-bold mb-2 mt-4">7.1. Droits Canada / Québec – Loi 25 / LPRPDE</h3>
        <ul className="mb-3">
          <li>Accès</li>
          <li>Rectification</li>
          <li>Retrait du consentement</li>
          <li>Portabilité des données (Loi 25)</li>
          <li>Suppression (dans certaines conditions)</li>
        </ul>

        <h3 className="h6 fw-bold mb-2 mt-4">7.2. Droits RGPD (Europe)</h3>
        <ul className="mb-3">
          <li>Droit d'accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (« droit à l'oubli »)</li>
          <li>Droit d'opposition</li>
          <li>Droit à la portabilité</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit de retirer le consentement à tout moment</li>
        </ul>

        <h3 className="h6 fw-bold mb-2 mt-4">7.3. Droits CCPA (Californie, USA)</h3>
        <ul className="mb-3">
          <li>Droit de savoir quelles données sont collectées</li>
          <li>Droit de demander suppression</li>
          <li>Droit d'opt-out de la vente ou partage des données</li>
          <li>Droit de non-discrimination</li>
        </ul>
        <p className="mb-4">
          TOUSKI <strong>ne vend pas</strong> les données personnelles.
        </p>

        <h3 className="h6 fw-bold mb-2 mt-4">7.4. Droits ARCO (Mexique)</h3>
        <ul className="mb-4">
          <li>Acceso</li>
          <li>Rectificación</li>
          <li>Cancelación</li>
          <li>Oposición</li>
        </ul>

        <h2 className="h4 fw-bold mb-3 mt-5">8. Cookies et technologies similaires</h2>
        <p className="mb-3">Nous utilisons des cookies afin de :</p>
        <ul className="mb-4">
          <li>faire fonctionner le site (cookies essentiels)</li>
          <li>analyser l'usage du site (analytics)</li>
          <li>personnaliser le contenu et les publicités</li>
          <li>mémoriser vos préférences</li>
        </ul>

        <h3 className="h6 fw-bold mb-2 mt-4">8.1 Types de cookies</h3>
        <ul className="mb-4">
          <li>Cookies essentiels (obligatoires)</li>
          <li>Cookies de performance</li>
          <li>Cookies d'analyse (Google Analytics ou équivalent)</li>
          <li>Cookies marketing / reciblage (avec consentement)</li>
        </ul>
        <p className="mb-4">
          Vous pouvez gérer ou désactiver les cookies via notre <strong>bannière de consentement</strong> ou via votre navigateur.
        </p>

        <h2 className="h4 fw-bold mb-3 mt-5">9. Sécurité</h2>
        <p className="mb-3">Nous appliquons des mesures techniques et organisationnelles strictes :</p>
        <ul className="mb-4">
          <li>chiffrement HTTPS</li>
          <li>pare-feu</li>
          <li>stockage sécurisé</li>
          <li>contrôle d'accès</li>
          <li>audits périodiques</li>
          <li>conformité PCI-DSS pour les paiements (via prestataires)</li>
        </ul>

        <h2 className="h4 fw-bold mb-3 mt-5">10. Mineurs</h2>
        <p className="mb-4">
          Nos services ne sont pas destinés aux personnes de moins de <strong>16 ans</strong> (UE) ou <strong>13 ans</strong> (Canada/USA/Mexique).
          Nous ne collectons pas volontairement leurs données.
        </p>

        <h2 className="h4 fw-bold mb-3 mt-5">11. Communications marketing</h2>
        <p className="mb-3">Vous pouvez vous désabonner à tout moment via :</p>
        <ul className="mb-4">
          <li>le lien en bas des courriels</li>
          <li>une demande à <a href="mailto:info@touski.online">info@touski.online</a></li>
        </ul>

        <h2 className="h4 fw-bold mb-3 mt-5">12. Contact pour exercer vos droits</h2>
        <div className="bg-light p-4 rounded mb-4">
          <p className="mb-2"><strong>Responsable de la protection des renseignements personnels (Loi 25 – Québec)</strong></p>
          <p className="mb-1">9517-6806 Québec inc.</p>
          <p className="mb-1">1030, Avenue Muguette</p>
          <p className="mb-1">St-Élie-de-Caxton, QC, G0X 2N0, Canada</p>
          <p className="mb-0">✉️ <a href="mailto:info@touski.online">info@touski.online</a></p>
        </div>

        <h2 className="h4 fw-bold mb-3 mt-5">13. Modifications du présent avis</h2>
        <p className="mb-4">
          TOUSKI se réserve le droit de modifier ce document à tout moment.
          La version en vigueur est celle publiée sur <a href="https://www.touski.online" target="_blank" rel="noopener">www.touski.online</a>.
        </p>
      </div>
      </div>
      </section>
    </>
  );
}
