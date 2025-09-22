import { useEffect, useState } from "react";

export default function HeroVideo() {
  const videos = [
    "/video/mediacion.mp4",
    "/video/mediacion2.mp4",
    "/video/mediacion3.mp4"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 10000); // cambia cada 10 segundos
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {videos.map((video, index) => (
        <video
          key={index}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Soluciones en Mediación
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Confía en expertos para resolver tus conflictos legales sin juicios largos.
        </p>
        <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-300 transition">
          Contáctanos
        </button>
      </div>
    </section>
  );
}
