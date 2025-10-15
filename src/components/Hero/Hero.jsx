
import React from "react";

const Hero = ({ title, bg, logo, bookingButton }) => {
  return (
    <section
      className={`
        relative
        flex flex-col
        justify-center
        items-center
        w-full h-[80vh] md:h-[100vh] lg:h-[100vh]
        overflow-hidden
      `}
    >
      {/* Fondo parallax */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
        }}
      />

      {/* Capa translúcida y contenido */}
      <div
        className={`
          absolute inset-0
          bg-white/30 backdrop-blur-[2px]
          flex flex-col justify-center items-center gap-4
          sm:top-[-0px] md:top-[0px] lg:top-[0px]
        `}
      >
        {logo && (
          <img
            src={logo}
            alt="Logo"
            className={`
              object-contain
              dimensions
              `}
          />
        )}

        {title && (
          <h2 className="text-white text-4xl font-bold text-center drop-shadow-md">
            {title}
          </h2>
        )}

        {bookingButton && (
          <button className="px-6 py-2 bg-[#4297cb] text-white rounded hover:bg-[#4297cb] transition">
            RESERVAR TURNO
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;

