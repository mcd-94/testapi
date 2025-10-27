"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";
import ImageToBase64 from "@/components/ImageToBase64/ImageToBase64";
export default function Home() {
  const [specialties, setSpecialties] = useState([]);
  const [healthInsurances, setHealthInsurances] = useState([]);

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
    async function fetchHealthInsurances() {
      try {
        const res = await fetch("/healthinsurances");
        if (!res.ok) throw new Error("Error al obtener las obras sociales");

        const data = await res.json();
        setHealthInsurances(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSpecialties();
    fetchHealthInsurances();
  }, []);

  return (
    <div>
      <main>
        <Hero
          title="Patagonia Software Solutions:"
          bg="assets/heroBackgrounds/homePage.jpg"
          logo="assets/branding/logoCompletoSF.png"
          bookingButton="true"
        />
        <section className="p-6">
          <header className="mb-4 flex flex-col gap-1">
            <h2 className="text-3xl font-semibold text-[#3478a2]">
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
                  description={e.description}
                  image={e.image}
                />
              ))
            ) : (
              <p>Cargando especialidades...</p>
            )}
          </div>
        </section>
        <section className="p-6">
          <header className="mb-4 flex flex-col gap-1">
            <h2 className="text-3xl font-semibold text-[#3478a2]">
              Obras Sociales
            </h2>
            <p className="text-xl text-gray-600">
              En MEDICALIDW tenemos convenios con diversas obras sociales para
              facilitar tu acceso a nuestros servicios.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {healthInsurances.length > 0 ? (
              healthInsurances.map((e) => (
                <Card key={e._id} image={e.image} title={e.name} />
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
