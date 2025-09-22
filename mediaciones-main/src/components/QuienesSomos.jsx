import './QuienesSomos.css';

export default function QuienesSomos() {
  return (
    <section className="quienes-somos-section" id="quienes-somos">
      <h2>¿Quiénes Somos?</h2>
      <p>
        Somos un equipo de mediadores privados certificados por el Tribunal Superior de Justicia de la CDMX,
        especializados en ofrecer soluciones legales efectivas a través de la mediación legal privada. Nuestro
        objetivo es fortalecer las relaciones y lograr acuerdos sostenibles que reduzcan los tiempos y costos
        de los procesos tradicionales.
      </p>

      <div className="quienes-somos-grid">
        {/* Tarjeta Emma Patricia */}
        <div className="quienes-somos-card">
          <h3>Emma Patricia Solís Cámara Cano</h3>
          <p>
            Licenciada en Derecho por la Universidad Iberoamericana, Maestría en Derechos Humanos (UIA) y diplomado en
            Derecho Corporativo por el ITAM. Mediadora privada certificada (No. 122) por el Tribunal Superior de Justicia.
            Experiencia en mediación comunitaria y corporativa con empresas como Grupo Minero de México, Banca Monex,
            Bancomer y comunidades agrarias. Fue presidenta de la Asociación de Egresados de Derecho de la Universidad
            Iberoamericana y miembro del Ilustre y Nacional Colegio de Abogados de México.
          </p>
        </div>

        {/* Foto María del Pilar */}
        <div className="quienes-somos-foto">
          <img src="/img/maria-del-pilar.jpg" alt="María del Pilar Carrizosa Celis" />
        </div>
      </div>
    </section>
  );
}
