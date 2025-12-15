import Footer8 from "@/components/footers/Footer8";
import Header9 from "@/components/headers/Header9";
import Link from "next/link";

export const metadata = {
  title: "Solutions de confort pour la maison en climat froid | TOUSKI",
  description:
    "TOUSKI propose des solutions de confort pour la maison adaptées aux climats froids. Produits pour améliorer la chaleur intérieure, l’isolation et le bien-être au quotidien au Canada.",
  alternates: {
    canonical: "https://touski.online/",
  },
  openGraph: {
    title: "Solutions de confort pour la maison en climat froid | TOUSKI",
    description:
      "TOUSKI propose des solutions de confort pour la maison adaptées aux climats froids. Produits pour améliorer la chaleur intérieure, l’isolation et le bien-être au quotidien au Canada.",
    url: "https://touski.online/",
    locale: "fr_FR",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TOUSKI",
  url: "https://touski.online",
  description:
    "TOUSKI propose des solutions de confort pour la maison adaptées aux climats froids.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TOUSKI",
  url: "https://touski.online",
};

export default function Home() {
  return (
    <>
      <Header9 />
      <main className="page-wrapper">
        <section className="bg-light py-5 border-bottom">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <h1 className="display-5 fw-bold mb-3">
                  Solutions de confort pour la maison, adaptées aux climats
                  froids
                </h1>
                <p className="lead text-muted mb-4">
                  Des produits conçus pour améliorer la chaleur intérieure,
                  renforcer l’isolation et augmenter le bien-être à la maison,
                  même lorsque le froid s’installe durablement.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="btn btn-primary btn-lg text-uppercase fw-semibold"
                  >
                    Découvrir la collection
                  </Link>
                  <Link
                    href="#solutions"
                    className="btn btn-outline-dark btn-lg fw-semibold"
                  >
                    Nos solutions pour la maison
                  </Link>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="p-4 rounded-4 shadow-sm bg-white h-100 d-flex flex-column gap-3">
                  <p className="mb-0 text-uppercase fw-semibold text-secondary">
                    Confort thermique • Isolation douce • Bien-être durable
                  </p>
                  <p className="mb-0">
                    TOUSKI sélectionne des solutions prêtes à l’emploi pour
                    maîtriser les courants d’air, protéger les zones sensibles
                    et conserver la chaleur dans les pièces de vie. Chaque
                    produit est choisi pour sa capacité à améliorer le confort
                    domestique sans travaux lourds, en s’intégrant facilement
                    aux habitudes du quotidien.
                  </p>
                  <p className="mb-0">
                    Pensées pour les logements canadiens, nos collections
                    répondent aux besoins des appartements urbains, des maisons
                    familiales et des espaces de télétravail où la stabilité
                    thermique et le bien-être du corps sont essentiels toute
                    l’année.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9">
              <h2 className="mb-4">
                Améliorer le confort de la maison en climat froid
              </h2>
              <p>
                Vivre dans un climat froid impose des contraintes réelles sur le
                confort de la maison. Le froid intérieur, les courants d’air,
                une isolation insuffisante ou encore les longues heures passées
                en télétravail peuvent affecter le bien-être quotidien et la
                qualité de vie.
              </p>
              <p>
                <strong>TOUSKI</strong> propose des solutions de confort pour la
                maison spécialement pensées pour les environnements froids,
                notamment au Canada. Notre objectif est d’améliorer la chaleur
                intérieure, de limiter les pertes thermiques et de rendre chaque
                espace plus agréable à vivre, sans nécessiter de travaux
                complexes.
              </p>
              <p>
                Nos produits sont conçus pour répondre à des besoins concrets :
                conserver la chaleur, améliorer l’isolation intérieure, réduire
                les sensations de froid et créer une atmosphère confortable dans
                les pièces de vie comme le salon, la chambre ou le bureau à
                domicile.
              </p>
              <p>
                TOUSKI s’adresse aussi bien aux appartements qu’aux maisons. Nos
                solutions sont adaptées aux logements exposés au froid, aux
                condos urbains et aux espaces de télétravail nécessitant un
                confort thermique constant.
              </p>
              <p>
                Contrairement aux boutiques généralistes, TOUSKI ne vend pas des
                produits saisonniers. Nous sélectionnons des solutions durables
                et utiles pour la maison, pensées pour être utilisées au
                quotidien dans des conditions climatiques exigeantes. Le confort
                intérieur est une nécessité, pas une tendance.
              </p>
              <p>
                Plaids thermiques, couvertures chauffantes, boudins de porte,
                rideaux isolants ou tapis épais agissent sur les points
                sensibles de la maison et limitent les ponts thermiques souvent
                ignorés. En combinant plusieurs solutions, la chaleur se diffuse
                de manière enveloppante et les pièces gagnent en stabilité sans
                devoir augmenter la puissance du chauffage central.
              </p>
              <p>
                Pensées pour les logements canadiens, nos collections répondent
                aux particularités des bâtiments soumis au froid : grandes
                surfaces vitrées, planchers en contact avec des zones froides,
                entrées fréquemment sollicitées et espaces de travail qui
                demandent une température régulière. L’objectif est de conserver
                l’énergie, de réduire les infiltrations d’air et de sécuriser la
                température ressentie dans chaque pièce de vie.
              </p>
              <p className="mb-0">
                Chaque référence est évaluée sur sa capacité à rester efficace
                dans le temps, à se nettoyer facilement et à s’intégrer à la
                décoration sans compromis. En renforçant l’isolation intérieure
                et en optimisant la diffusion de chaleur, TOUSKI contribue à
                diminuer les pertes d’énergie et à améliorer la qualité de vie
                au quotidien, que l’on vive en famille, en condo ou en maison
                individuelle. Les matériaux choisis restent performants malgré
                l’usure et la répétition des cycles de chauffage.
              </p>
            </div>
          </div>
        </section>

        <section id="solutions" className="py-5 bg-white border-top border-bottom">
          <div className="container">
            <h2 className="mb-4">Nos solutions de confort pour la maison</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <h3 className="h4 mb-2">
                  <Link
                    href="/chaleur-confort"
                    className="text-decoration-none text-dark"
                  >
                    Chaleur &amp; Confort
                  </Link>
                </h3>
                <p className="mb-0">
                  Plaids thermiques, couvertures chauffantes et solutions
                  textiles conçues pour améliorer la chaleur intérieure et le
                  confort au quotidien. Ces pièces favorisent une chaleur
                  enveloppante, réduisent la sensation de sol froid et
                  complètent le chauffage central sans effort. Idéal pour
                  prolonger les moments de détente, sécuriser les soirées en
                  famille et offrir un cocon stable lors des longues journées de
                  télétravail.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h4 mb-2">
                  <Link
                    href="/isolation-protection"
                    className="text-decoration-none text-dark"
                  >
                    Isolation &amp; Protection
                  </Link>
                </h3>
                <p className="mb-0">
                  Produits destinés à limiter les courants d’air, conserver la
                  chaleur et améliorer l’isolation intérieure sans travaux.
                  Boudins de porte, joints faciles à poser, rideaux isolants,
                  films pour fenêtres ou tapis épais sécurisent les points de
                  fuite. En réduisant les déperditions, la maison reste stable,
                  les pièces deviennent plus silencieuses et les occupants
                  profitent d’un confort constant, même lorsque la température
                  extérieure baisse.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h4 mb-2">
                  <Link
                    href="/teletravail-bien-etre"
                    className="text-decoration-none text-dark"
                  >
                    Télétravail &amp; Bien-être
                  </Link>
                </h3>
                <p className="mb-0">
                  Solutions pensées pour le confort du corps et le bien-être
                  lors du travail à domicile, en particulier dans des
                  environnements froids. Coussins de soutien, chauffe-pieds,
                  plaids pour bureau et accessoires ergonomiques stabilisent la
                  posture et maintiennent la chaleur corporelle, afin de
                  préserver la concentration et de limiter la fatigue liée aux
                  variations de température dans la journée.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="h4 mb-2">
                  <Link
                    href="/cocooning-maison"
                    className="text-decoration-none text-dark"
                  >
                    Cocooning Maison
                  </Link>
                </h3>
                <p className="mb-0">
                  Accessoires fonctionnels et confortables pour transformer
                  l’intérieur en un espace chaleureux et agréable à vivre.
                  Textiles doux, luminaires apaisants, coussins structurants et
                  petits rangements créent une ambiance enveloppante propice au
                  repos. Chaque pièce est sélectionnée pour ajouter une touche
                  de chaleur visuelle et tactile, en cohérence avec une maison
                  qui reste accueillante quand le froid s’installe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <h2 className="mb-3">Conseils pratiques pour un intérieur stable</h2>
              <p>
                Pour renforcer l’efficacité des produits TOUSKI, quelques gestes
                simples optimisent la chaleur intérieure. Vérifier l’étanchéité
                des entrées, couvrir les planchers exposés, orienter les sources
                de chaleur vers les zones occupées et ventiler brièvement pour
                renouveler l’air sans le refroidir sont des réflexes efficaces.
                Ces pratiques complètent nos solutions et prolongent la
                sensation de confort dans chaque pièce.
              </p>
              <p>
                La maison profite aussi d’une organisation adaptée au froid.
                Regrouper les espaces de vie dans les zones les plus isolées,
                utiliser des rideaux épais pour compartimenter les volumes et
                superposer les textiles sur les assises réduisent la perte
                thermique. Les accessoires TOUSKI sont pensés pour se repositionner
                facilement, afin de suivre les habitudes quotidiennes et
                s’ajuster aux besoins de la famille ou du télétravail.
              </p>
              <p className="mb-0">
                Un intérieur confortable dépend enfin de la qualité des
                matériaux au contact de la peau. Des fibres respirantes mais
                protectrices, des mousses denses et des finitions anti-glisse
                améliorent la sécurité et la sensation de chaleur. En combinant
                ces choix avec des produits durables, on crée un cocon cohérent
                où le froid est maîtrisé et où chaque geste du quotidien reste
                fluide.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-light py-5 border-top">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h2 className="mb-3">Pourquoi choisir TOUSKI</h2>
                <p>
                  Nous privilégions des produits utiles, testés en situation
                  réelle et capables de résister aux exigences des climats
                  froids. Notre sélection réduit les gadgets et valorise les
                  solutions qui simplifient la vie à la maison, limitent les
                  retours et s’adaptent à la réalité des logements canadiens.
                </p>
                <ul className="list-unstyled d-grid gap-2 mb-0">
                  <li>Produits sélectionnés pour un usage réel à la maison</li>
                  <li>Adaptés aux climats froids et aux logements canadiens</li>
                  <li>Solutions utiles, pas des gadgets</li>
                  <li>Faible taux de retour</li>
                  <li>Confort, fiabilité et simplicité d’utilisation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <h2 className="mb-3">Explorer nos collections</h2>
              <p className="mb-0">
                Découvrez nos solutions de{" "}
                <Link href="/chaleur-confort">chaleur et confort</Link>, nos
                produits d’<Link href="/isolation-protection">isolation pour la maison</Link>, nos
                accessoires de{" "}
                <Link href="/teletravail-bien-etre">bien-être pour le télétravail</Link> et notre
                sélection <Link href="/cocooning-maison">cocooning maison</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="container pb-5">
          <p className="fw-semibold">
            TOUSKI — Des solutions de confort pensées pour la maison.
          </p>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Footer8 />
    </>
  );
}
