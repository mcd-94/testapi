import { useEffect, useState } from "react";

const Footer = () => {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    // 🩺 Cargar specialties desde localStorage (solo en cliente)
    if (typeof window !== "undefined") {
      const storedSpecialties = localStorage.getItem("specialties");

      if (storedSpecialties) {
        try {
          setSpecialties(JSON.parse(storedSpecialties));
        } catch (err) {
          console.error(
            "Error al parsear specialties desde localStorage:",
            err,
          );
        }
      }
    }
  }, []); // 👈 cierre correcto del useEffect

  return (
    <footer
      className={`
        p-5
        bg-[url('/assets/branding/fondo.jpg')]
        bg-repeat
      `}
    >
      <div
        className={`
          flex flex-col-reverse
          gap-10
          md:grid md:grid-cols-[30%_auto]
        `}
      >
        <div className="flex justify-center items-center">
          <img
            src="/assets/branding/logoCompletoSF.png"
            className="w-[200px] h-auto"
            alt="Logo MedicalIDW"
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
      </div>
      <div className="border-t pt-5 text-center mt-5">
        <p>© MedicalIDW - Clínica Médica</p>
        <p>Introducción al Desarrollo Web - 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
