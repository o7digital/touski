import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="about-us container">
      <div className="mw-930">
        <h2 className="page-title">TOUSKI</h2>
      </div>
      <div className="about-us__content pb-5 mb-5">
        <p className="mb-5">
          <Image
            style={{ height: "fit-content" }}
            loading="lazy"
            className="w-100 h-auto d-block"
            src="/assets/images/touski-original.png"
            width="1920"
            height="1080"
            alt="TOUSKI - Tout ce qui est nécessaire pour son chez-soi"
          />
        </p>
        <div className="mw-930">
          <h3 className="mb-4">Notre Histoire</h3>
          <p className="fs-6 fw-medium mb-4">
            TOUSKI est né d'une idée simple : rendre la vie quotidienne plus facile, plus accessible et plus harmonieuse.
            Dans un monde où l'on manque souvent de temps, nous avons voulu créer une plateforme qui rassemble <strong>tout ce dont on a besoin chez soi</strong>, au même endroit, avec une qualité irréprochable et un service humain.
          </p>
          <p className="mb-4">
            Fondée par <strong>9517-6806 Québec inc.</strong>, TOUSKI a vu le jour avec une vision très claire : offrir aux foyers du Canada, des États-Unis, d'Europe et du Mexique une nouvelle manière d'équiper leur espace de vie, en privilégiant la fiabilité, la transparence et une expérience client irréprochable.
          </p>
          <p className="mb-4">
            Notre histoire est celle de personnes passionnées par la simplicité, l'organisation, l'innovation et le confort. TOUSKI se développe aujourd'hui comme une marque internationale, portée par des valeurs fortes et par la volonté d'apporter une réelle valeur à chaque foyer, à chaque famille, à chaque personne.
          </p>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="mb-3">Notre Mission</h5>
              <p className="mb-3">
                Notre mission est d'offrir une sélection soigneusement choisie de produits essentiels pour la maison — pratiques, fiables, esthétiques — tout en garantissant une expérience fluide, simple et sécurisée.
              </p>
              <p className="mb-3">
                Nous voulons que chaque client puisse trouver <strong>TOUT CE QU'IL FAUT POUR SON CHEZ-SOI</strong>, facilement, rapidement, et sans stress.
              </p>
              <ul className="mb-3" style={{listStyle: 'disc', paddingLeft: '1.5rem'}}>
                <li>des produits de qualité, testés et vérifiés,</li>
                <li>une logistique intelligente,</li>
                <li>un suivi client transparent,</li>
                <li>et un support humain, disponible, bienveillant et professionnel.</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5 className="mb-3">Notre Vision</h5>
              <p className="mb-3">
                Nous aspirons à devenir <strong>la référence numéro un</strong> en matière d'équipement domestique, en réunissant sur une seule plateforme les produits essentiels au bien-être quotidien.
              </p>
              <p className="mb-3">Notre vision s'appuie sur 4 piliers :</p>
              <ul style={{listStyle: 'disc', paddingLeft: '1.5rem'}}>
                <li><strong>Simplicité</strong> : tout ce dont vous avez besoin, au même endroit.</li>
                <li><strong>Accessibilité</strong> : des produits fiables, au meilleur rapport qualité-prix.</li>
                <li><strong>Innovation</strong> : une plateforme moderne, intuitive et connectée.</li>
                <li><strong>Confiance</strong> : des processus clairs, conformes aux normes internationales.</li>
              </ul>
              <p className="mt-3">
                TOUSKI n'est pas seulement une boutique : c'est une solution pratique pour la vie moderne.
              </p>
            </div>
          </div>
        </div>
        <div className="mw-930 d-lg-flex align-items-lg-center mt-5">
          <div className="image-wrapper col-lg-6">
            <Image
              style={{ height: "fit-content" }}
              className="h-auto"
              loading="lazy"
              src="/assets/images/touski-original.png"
              width="800"
              height="800"
              alt="Univers Touski"
            />
          </div>
          <div className="content-wrapper col-lg-6 px-lg-4">
            <h5 className="mb-3">La Compagnie</h5>
            <p className="mb-3">
              TOUSKI est une marque opérée par <strong>9517-6806 Québec inc.</strong>, basée à :
            </p>
            <p className="mb-3">
              <strong>1030, Avenue Muguette<br />
              Saint-Élie-de-Caxton QC G0X 2N0<br />
              Canada</strong>
            </p>
            <p className="mb-3">
              Contact : <a href="mailto:contact@touski.online" style={{color: '#FF9445'}}>contact@touski.online</a>
            </p>
            <p>
              Notre entreprise s'engage à offrir une gestion professionnelle, une conformité légale exemplaire, et une infrastructure numérique de haut niveau.
              Nous travaillons avec des partenaires internationaux, des plateformes technologiques performantes, et une approche centrée sur le client.
            </p>
            <p className="mt-3 fw-medium" style={{color: '#FF9445'}}>
              TOUSKI grandit chaque jour avec une ambition simple : <strong>équiper les foyers du monde entier avec des produits fiables, accessibles et essentiels.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
