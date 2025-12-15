import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title: "Nos services - Solutions de confort pour la maison | TOUSKI",
  description:
    "Découvrez les services TOUSKI : solutions de confort pour la maison, sélection de produits utiles et durables pour améliorer le bien-être au quotidien.",
};

export default function NosServicesPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section id="nos-services" className="container mw-930 pb-5">
          <h2>Nos services</h2>
          <p>
            Chez <strong>TOUSKI</strong>, nous développons des solutions pensées pour améliorer le confort de la maison
            et la qualité de vie au quotidien. Notre approche repose sur la sélection de produits utiles,
            fonctionnels et adaptés à un usage réel, en particulier dans des environnements où le confort intérieur
            est essentiel.
          </p>

          <h3>Solutions de confort pour la maison</h3>
          <p>
            TOUSKI propose des solutions destinées à rendre les espaces de vie plus agréables,
            plus confortables et mieux adaptés aux besoins du quotidien.
            Nos services s’adressent aussi bien aux appartements qu’aux maisons,
            et concernent les pièces de vie comme le salon, la chambre ou le bureau à domicile.
          </p>

          <h3>Amélioration du confort intérieur</h3>
          <p>
            Nous sélectionnons des produits permettant d’améliorer la sensation de confort à l’intérieur,
            en apportant une meilleure gestion de la chaleur, une atmosphère plus agréable
            et un environnement propice au bien-être.
            Chaque solution proposée vise à réduire les inconforts liés au froid intérieur
            ou à une isolation insuffisante.
          </p>

          <h3>Produits pensés pour le quotidien</h3>
          <p>
            Contrairement aux boutiques généralistes, TOUSKI ne propose pas de produits gadgets ou saisonniers.
            Nos services reposent sur une sélection rigoureuse de solutions durables,
            conçues pour être utilisées au quotidien dans la maison,
            avec un souci constant de qualité, de fiabilité et de simplicité d’usage.
          </p>

          <h3>Accompagnement et sélection responsable</h3>
          <p>
            TOUSKI accompagne ses clients en proposant une sélection cohérente de produits
            répondant à des besoins concrets. Nous privilégions des solutions à forte valeur d’usage,
            avec un faible taux de retour, afin de garantir une expérience fiable et satisfaisante.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}
