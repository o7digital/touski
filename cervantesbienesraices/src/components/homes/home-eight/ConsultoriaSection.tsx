"use client";

const ServicesSection = () => {
  return (
    <section id="servicios" className="pt-120 pb-120 bg-light">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-12">
            <div className="title-one mb-50">
              <h2>Servicios</h2>
              <p>
                Soluciones integrales para invertir, comprar, vender o rentar propiedades.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>🏠 Venta y renta</h5>
              <p>Propiedades residenciales y comerciales.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>📑 Asesoría legal</h5>
              <p>Contratos, escrituración y trámites oficiales.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-box p-4 bg-white shadow-sm rounded">
              <h5>🤝 Alianzas</h5>
              <p>Colaboración con colegas de confianza.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
