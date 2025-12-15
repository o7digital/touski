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
        <section className="container mw-930 pb-5">
          <h2>Pourquoi le confort de la maison est devenu essentiel</h2>
          <p>
            Le confort à la maison n’est plus un luxe, mais une nécessité.
            Entre le télétravail, le temps passé à l’intérieur et les contraintes climatiques,
            l’environnement domestique joue un rôle direct sur le bien-être, la concentration
            et la qualité de vie.
          </p>
          <p>
            Une maison confortable permet de mieux gérer les variations de température,
            de limiter les sensations d’inconfort et de créer un espace propice au repos
            comme à l’activité quotidienne.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Une approche centrée sur l’usage réel</h2>
          <p>
            Chez TOUSKI, les services et les solutions proposées sont pensés à partir
            de situations concrètes de la vie quotidienne.
            Nous analysons les besoins réels liés à l’habitat, au travail à domicile
            et au confort intérieur afin de proposer des solutions réellement utiles.
          </p>
          <p>
            Cette approche permet d’éviter les produits superflus et de privilégier
            des solutions simples, efficaces et durables pour la maison.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Des solutions adaptées aux différents espaces de vie</h2>
          <p>
            Les besoins en confort ne sont pas les mêmes selon les espaces.
            Salon, chambre, bureau à domicile ou espaces polyvalents nécessitent
            des solutions adaptées à leur usage.
          </p>
          <p>
            TOUSKI prend en compte ces différences afin de proposer des services
            et des solutions cohérentes avec les réalités de chaque pièce de la maison.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Une vision durable du confort domestique</h2>
          <p>
            L’amélioration du confort de la maison s’inscrit dans une logique durable.
            Il s’agit de privilégier des solutions fiables, conçues pour durer,
            et capables d’apporter un bénéfice réel dans le temps.
          </p>
          <p>
            Cette vision permet de construire une relation de confiance avec les utilisateurs
            et de garantir une expérience cohérente, loin des tendances éphémères.
          </p>
        </section>
        <section className="container mw-930 pb-5">
          <h2>Nos domaines d’intervention</h2>
          <p>
            Les services TOUSKI s’articulent autour de plusieurs axes complémentaires
            visant à améliorer le confort global de la maison.
            Chaque approche répond à un besoin spécifique du quotidien.
          </p>
          <ul>
            <li><a href="/chaleur-confort">Chaleur et confort intérieur</a></li>
            <li><a href="/isolation-protection">Isolation et protection de la maison</a></li>
            <li><a href="/teletravail-bien-etre">Télétravail et bien-être à domicile</a></li>
            <li><a href="/cocooning-maison">Cocooning et qualité de vie à la maison</a></li>
          </ul>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}
