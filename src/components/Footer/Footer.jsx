import React from "react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [specialties, setSpecialties] = useState([]);
  useEffect(() => {
    async function fetchSpecialties() {
      try {
        const res = await fetch("/specialties");
        if (!res.ok) throw new Error("Error al obtener las especialidades");

        const data = await res.json();
        setSpecialties(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSpecialties();
  }, []);

  return (
    <footer
      className={`
      flex flex-col-reverse
      gap-3
      p-5
      md:grid md:grid-cols-[30%_auto]
      bg-[url('/assets/branding/fondo.jpg')]
      bg-repeat
    `}
    >
      <div className="flex justify-center items-center">
        <img
          src="/assets/branding/logoCompletoSF.png"
          className="w-[200px] h-auto"
        />
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:gap-6">
        <nav>
          <h2 className="text-lg font-bold mb-1">Nuestros Servicios</h2>
          <ul className="flex flex-col gap-3">
            {specialties.map((e) => (
              <li key={e._id}>{e.name}</li>
            ))}
          </ul>
        </nav>
        <nav>
          <h2 className="text-lg font-bold mb-1">Servicios Adicionales</h2>
          <ul className="flex flex-col gap-3">
            <li>Laboratorio</li>
            <li>Medicina Deportiva</li>
            <li>Telemedicina</li>
            <li>Rehabilitación Online</li>
            <li>Cirugía Robótica</li>
          </ul>
        </nav>
        <nav>
          <h2 className="text-lg font-bold mb-1">Contacto</h2>
          <ul className="flex flex-col gap-3">
            <li>Dirección: Av. Mendoza 2301, Rio Gallegos - Santa Cruz</li>
            <li>Horarios: Lunes a Sábados 08:00 a 20:00</li>
            <li>WhatsApp: 2978451223</li>
            <li>Correo Electrónico: Medicalidw@gmail.com</li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
