import Footer8 from "@/components/footers/Footer8";

import Header1 from "@/components/headers/Header1";
import About from "@/components/otherPages/about/About";
import Clients from "@/components/otherPages/about/Clients";
import Services from "@/components/otherPages/about/Services";
import React from "react";

export const metadata = {
  title: "À propos de TOUSKI | Confort de la maison et qualité de vie",
  description:
    "Découvrez la vision de TOUSKI : améliorer le confort de la maison grâce à des solutions utiles, durables et adaptées aux usages quotidiens.",
  alternates: {
    canonical: "https://touski.online/about",
  },
};
export default function AboutPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <About />
        <Services />
        <Clients />
        <section className="container mw-930 pb-5">
          <h1>TOUSKI : repenser le confort de la maison</h1>
          <p>
            La raison d’être de TOUSKI est de faire de la maison un espace réellement confortable, stable et
            aligné sur les usages quotidiens. Notre ambition n’est pas de multiplier les références, mais
            d’aider les foyers à comprendre les leviers concrets du bien-être intérieur et à structurer leurs
            priorités sans tomber dans le superflu.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Notre vision du confort domestique</h2>
          <p>
            TOUSKI est né d’un constat simple : le confort de la maison
            joue un rôle central dans la qualité de vie.
            Avec l’évolution des modes de vie, du télétravail
            et du temps passé à domicile,
            l’environnement intérieur est devenu un élément clé
            du bien-être quotidien.
          </p>
          <p>
            Notre vision repose sur une approche globale du confort domestique,
            qui prend en compte la chaleur intérieure,
            l’isolation, le bien-être physique et l’atmosphère générale
            de la maison.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Une approche centrée sur les usages réels</h2>
          <p>
            Chez TOUSKI, chaque solution est pensée à partir
            de situations concrètes de la vie quotidienne.
            Nous analysons les usages réels de la maison
            afin de proposer des solutions utiles,
            simples à intégrer et durables dans le temps.
          </p>
          <p>
            Cette approche permet d’éviter les produits superflus
            et de privilégier des solutions cohérentes
            avec les besoins réels des occupants.
          </p>
          <p>
            Observer les routines, comprendre les contraintes climatiques et identifier les points de friction
            nous permettent de prioriser des réponses adaptées : limiter les courants d’air, stabiliser la
            chaleur, organiser les zones de travail ou de repos. Chaque recommandation vise un usage précis et
            s’inscrit dans une logique de simplicité.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Le confort comme équilibre</h2>
          <p>
            Le confort domestique ne se résume pas à un seul élément.
            Il résulte d’un équilibre entre différents facteurs :
            température intérieure, isolation,
            aménagement des espaces et bien-être personnel.
          </p>
          <p>
            TOUSKI considère le confort comme un ensemble cohérent,
            où chaque aspect contribue à créer
            un environnement intérieur agréable et fonctionnel.
          </p>
          <p>
            Cet équilibre suppose de traiter les zones sensibles (fenêtres, planchers, seuils), de veiller à
            l’ergonomie des espaces de travail et de repos, et de préserver une atmosphère chaleureuse sans
            artifices. L’objectif est d’obtenir une maison refuge, lisible et rassurante pour tous ses occupants.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>Une démarche durable et responsable</h2>
          <p>
            L’amélioration du confort de la maison
            s’inscrit dans une logique durable.
            TOUSKI privilégie des solutions fiables,
            conçues pour durer et répondre à des besoins réels.
          </p>
          <p>
            Cette démarche vise à construire une relation de confiance
            avec les utilisateurs,
            en proposant des solutions utiles
            plutôt que des tendances éphémères.
          </p>
          <p>
            La durabilité passe par le choix de matériaux solides, l’entretien facilité et la capacité des
            solutions à rester efficaces malgré les cycles de chaleur et de froid. Nous favorisons les
            interventions mesurées qui améliorent le confort intérieur sans complexifier la vie quotidienne.
          </p>
        </section>

        <section className="container mw-930 pb-5">
          <h2>TOUSKI, un projet orienté qualité de vie</h2>
          <p>
            TOUSKI s’adresse à celles et ceux
            qui souhaitent améliorer leur cadre de vie
            et créer un intérieur confortable,
            adapté aux exigences du quotidien.
          </p>
          <p>
            Notre approche est détaillée sur la page
            <a href="/nos-services">Nos services</a>,
            et se décline à travers nos contenus dédiés à la
            <a href="/chaleur-confort">chaleur et au confort intérieur</a>,
            à l’
            <a href="/isolation-protection">isolation de la maison</a>,
            au
            <a href="/teletravail-bien-etre">bien-être en télétravail</a>
            et au
            <a href="/cocooning-maison">cocooning à domicile</a>.
          </p>
          <p>
            En reliant ces piliers, nous affirmons une identité claire : accompagner les foyers dans la maîtrise
            de leur confort à la maison, avec des solutions durables, cohérentes et pensées pour l’usage
            quotidien. Cette vision guide l’ensemble de nos choix et prépare l’arrivée de futures offres
            orientées qualité de vie.
          </p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}
