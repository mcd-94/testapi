"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";

export default function Home() {
  const [specialties, setSpecialties] = useState([]);
  const [healthInsurances, setHealthInsurances] = useState([]);

  useEffect(() => {
    // 🩺 Cargar specialties desde localStorage (solo en cliente)
    if (typeof window !== "undefined") {
      const storedSpecialties = localStorage.getItem("specialties");
      const storedHealthInsurances = localStorage.getItem("healthInsurances");

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

      if (storedHealthInsurances) {
        try {
          setHealthInsurances(JSON.parse(storedHealthInsurances));
        } catch (err) {
          console.error(
            "Error al parsear healthInsurances desde localStorage:",
            err,
          );
        }
      }
    }
  }, []); // 👈 Cierra correctamente el useEffect

  return (
    <div>
      <main>
        <Hero
          bg="assets/heroBackgrounds/homePage.jpg"
          logo="assets/branding/logoCompletoSF.png"
          bookingButton="true"
        />

        {/* ---------- Especialidades ---------- */}
        <section className="p-5">
          <header className="mb-4 flex flex-col gap-1">
            <h2 className="text-3xl md:text-center font-semibold text-[#005f99]">
              Servicios Médicos
            </h2>
            <p className="text-xl text-gray-600">
              Contamos con una amplia variedad de estudios, respaldados por un
              equipo de profesionales con años de experiencia.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {specialties.length > 0 ? (
              specialties.map((e) => (
                <Card
                  key={e._id}
                  title={e.name}
                  titleColor="#005f99"
                  titleSize="text-xl"
                  description={e.description}
                  image={e.image}
                  displayTitle={true}
                  displayDescription={false}
                  border={true}
                  shadow={true}
                />
              ))
            ) : (
              <p>Cargando especialidades...</p>
            )}
          </div>
        </section>

        {/* ---------- Obras Sociales ---------- */}
        <section className="p-5 bg-[#faf8f8]">
          <header className="mb-4 flex flex-col gap-1">
            <h2 className="text-3xl md:text-center font-semibold text-[#005f99]">
              Obras Sociales
            </h2>
            <p className="text-xl text-gray-600">
              En MEDICALIDW tenemos convenios con diversas obras sociales para
              facilitar tu acceso a nuestros servicios.
            </p>
          </header>

          <div className="grid grid-cols-3 md:flex gap-4 md:grid-cols-3">
            {healthInsurances.length > 0 ? (
              healthInsurances.map((e) => (
                <Card
                  key={e._id}
                  image={e.image}
                  title={e.name}
                  titleColor={null}
                  description={e.description}
                  displayTitle={false}
                  displayDescription={false}
                  border={false}
                  shadow={false}
                />
              ))
            ) : (
              <p>Cargando obras sociales...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
