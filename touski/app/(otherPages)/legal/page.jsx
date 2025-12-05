import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Mentions légales - Touski | Québec",
  description: "Informations légales, politique de confidentialité et conditions générales de vente de Touski.",
  keywords: "mentions légales touski, politique confidentialité québec, cgv touski, informations légales"
};

export default function LegalPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper" style={{ position: "relative", zIndex: 1 }}>
        <section className="container mw-930 pt-4">
          <h1 className="page-title mb-4">Mentions Légales</h1>
          
          <div className="mb-5">
            <h2 className="h4 mb-3">1. Identification de l'entreprise</h2>
            <p><strong>Nom commercial:</strong> TOUSKI</p>
            <p><strong>Adresse:</strong> 1030, Avenue Muguette, Saint-Élie-de-Caxton QC G0X 2N0, Canada</p>
            <p><strong>Email:</strong> <a href="mailto:contact@touski.online">contact@touski.online</a></p>
            <p><strong>Téléphone:</strong> <a href="tel:+18197010378">+1 819-701-0378</a></p>
            <p><strong>Site web:</strong> <a href="https://touski.online">https://touski.online</a></p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">2. Hébergement</h2>
            <p><strong>Hébergeur:</strong> Vercel Inc.</p>
            <p><strong>Adresse:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">3. Protection des données personnelles</h2>
            <p>Conformément aux lois canadiennes sur la protection des renseignements personnels, notamment la LPRPDE (Loi sur la protection des renseignements personnels et les documents électroniques), nous nous engageons à protéger vos données personnelles.</p>
            <p><strong>Données collectées:</strong></p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Adresse postale</li>
              <li>Numéro de téléphone</li>
            </ul>
            <p><strong>Utilisation des données:</strong> Les données sont utilisées uniquement pour traiter vos commandes et vous contacter concernant nos services.</p>
            <p><strong>Conservation:</strong> Vos données sont conservées pendant la durée nécessaire au traitement de votre commande et conformément aux obligations légales.</p>
            <p><strong>Droits:</strong> Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à contact@touski.online</p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">4. Cookies</h2>
            <p>Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic. Vous pouvez gérer vos préférences de cookies via la bannière qui apparaît lors de votre première visite.</p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">5. Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, logos, etc.) est protégé par les droits d'auteur. Toute reproduction sans autorisation est interdite.</p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">6. Conditions générales de vente</h2>
            <p><strong>Prix:</strong> Tous les prix sont affichés en dollars canadiens (CAD) et incluent les taxes applicables.</p>
            <p><strong>Paiement:</strong> Nous acceptons les paiements par carte de crédit (Visa, Mastercard, American Express) et PayPal.</p>
            <p><strong>Livraison:</strong> Nous livrons partout au Canada. Les délais de livraison sont indiqués lors de la commande.</p>
            <p><strong>Retours:</strong> Vous disposez de 30 jours pour retourner un produit non satisfaisant. Le produit doit être dans son emballage d'origine et en parfait état.</p>
            <p><strong>Garantie:</strong> Tous nos produits sont garantis contre les défauts de fabrication conformément à la garantie du fabricant.</p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">7. Responsabilité</h2>
            <p>Nous mettons tout en œuvre pour assurer l'exactitude des informations sur notre site, mais ne pouvons être tenus responsables des erreurs ou omissions.</p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">8. Loi applicable</h2>
            <p>Les présentes mentions légales sont soumises au droit canadien et québécois. Tout litige sera soumis aux tribunaux compétents du Québec.</p>
          </div>

          <div className="mb-5">
            <h2 className="h4 mb-3">9. Contact</h2>
            <p>Pour toute question concernant ces mentions légales, contactez-nous:</p>
            <p>
              Email: <a href="mailto:contact@touski.online">contact@touski.online</a><br />
              Téléphone: <a href="tel:+18197010378">+1 819-701-0378</a>
            </p>
          </div>

          <p className="text-muted small">Dernière mise à jour: Novembre 2025</p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}
