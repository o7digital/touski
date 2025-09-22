export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-2">Mediación Familiar</h3>
            <p>Resolvemos conflictos familiares con empatía y soluciones duraderas.</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-2">Mediación Laboral</h3>
            <p>Negociación eficaz entre empleados y empleadores.</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-2">Mediación Civil</h3>
            <p>Soluciones legales sin procesos judiciales largos y costosos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
