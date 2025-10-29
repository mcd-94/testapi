import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";

export const metadata = {
  title: "Institucional - MEDICALIDW",
  description: "Atención médica cercana, confiable y de excelencia.",
};

export default function Page() {
  return (
    <div>
      <Hero title="Sobre nosotros" bg="assets/heroBackgrounds/aboutPage.jpg" />

      <section
        className={`
          missionSection
          flex flex-col
          md:grid md:grid-cols-[50%_auto]
          md:items-center
          gap-3
          m-3
          md:p-15
          bg-[url('/assets/branding/fondo.jpg')]
          bg-repeat
          `}
      >
        <header className="flex flex-col gap-5">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#005f99]">
            Nuestra Misión
          </h2>
          <p className="text-xl text-gray-600">
            En <b>MEDICALIDW</b>, nuestra misión es mejorar la calidad de vida
            de las personas a través de una atención médica cercana, confiable y
            de excelencia.
          </p>
          <p className="text-xl text-gray-600">
            Contamos con profesionales altamente capacitados y tecnología de
            vanguardia. Brindamos diagnósticos certeros, tratamientos efectivos
            y un acompañamiento integral, promoviendo inclusión y bienestar en
            cada etapa de la vida.
          </p>
        </header>

        <div>
          <img
            src="/assets/places/surgeryRoom.png"
            alt=""
            className="rounded-md w-full h-auto"
          />
        </div>
      </section>

      <section className="ourClinicsSection border">
        <header>Nuestras clínicas</header>

        <p>
          En MEDICALIDW, nuestra misión es mejorar la calidad de vida de las
          personas a través de una atención médica cercana, confiable y de
          excelencia.
        </p>

        <div className="cardContainer flex gap-3">
          {/* Puedo usar JavaScript dentro de JSX */}
          {console.log("Usar JavaScript")}

          <div className="border card flex flex-col jutify-center items-center border rounded-md shadow-lg px-3">
            <h3 className="border font-bold">Clínica Norte</h3>

            <img src="clinics/clinicaNorte.png" alt="" className="rounded-md" />

            <h4 className="font-bold">Especialidades:</h4>
            <ul className="border list-[square]">
              <li>Pediatría</li>
              <li>Cardiología</li>
              <li>Dermatología</li>
            </ul>
          </div>

          <div className="border card flex flex-col jutify-center items-center border rounded-md shadow-lg pt-1">
            <h3>Clínica Norte</h3>

            <img src="clinics/clinicaNorte.png" alt="" className="rounded-md" />

            <h4 className="font-bold">Especialidades:</h4>
            <ul className="border list-[square]">
              <li>Pediatría</li>
              <li>Cardiología</li>
              <li>Dermatología</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
