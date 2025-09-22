"use client";

const AboutSection = () => {
  return (
    <section id="quienes-somos" className="pt-120 pb-120 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="title-one text-center mb-40">
              <h2>Quiénes Somos</h2>
              <p>
                En <strong>CERVANTES BIENES RAICES</strong> ofrecemos un servicio basado en la
                confianza, la experiencia y la transparencia. Nuestra fundador,
                <strong> Javier Cervantes</strong>, cuenta con más de 20 años
                de trayectoria en el sector inmobiliario.
              </p>
            </div>
            <ul className="list-style-one">
              <li>🤝 Confianza y cercanía en cada trato</li>
              <li>📑 Trámites claros y transparentes</li>
              <li>🏡 Experiencia comprobada de más de 20 años</li>
              <li>✅ Resultados exitosos para nuestros clientes</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
