"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";
import ImageToBase64 from "@/components/ImageToBase64/ImageToBase64";
export default function Home() {
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
    <div>
      <main>
        <Hero
          title="Patagonia Software Solutions:"
          bg="assets/heroBackgrounds/homePage.jpg"
          logo="assets/branding/logoCompletoSF.png"
          bookingButton="true"
        />
        <section className="p-6">
          <header className="mb-4">
            <h2 className="text-2xl font-semibold">Servicios Médicos</h2>
            <p className="text-gray-600">
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
      </main>
    </div>
  );
}
