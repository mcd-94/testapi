import Hero from "@/components/Hero/Hero";
import Card from "@/components/Card/Card";

export const metadata = {
  title: "Institucional - MEDICALIDW",
  description: "Atención médica cercana, confiable y de excelencia.",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <Hero title="Conocénos" bg="assets/heroBackgrounds/aboutPage.jpg" />

      <section
        className={`
          missionSection
          flex flex-col
          md:grid md:grid-cols-[50%_auto]
          md:items-center
          gap-3
          mx-5
          md:p-15
          bg-[url('/assets/branding/fondo.jpg')]
          bg-repeat

          `}
      >
        <header className="flex flex-col gap-5">
          <h2 className="text-3xl md:text-5xl font-semibold my-5 text-[#005f99]">
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

      <section className="mx-5">
        <header className="flex flex-col gap-5">
          <h2 className="text-3xl md:text-5xl my-5 font-semibold text-[#005f99]">
            Nuestras Clínicas
          </h2>
        </header>

        <div
          className={`
          flex flex-col
          gap-5
          p-5
          `}
        >
          <Card
            key={"xxxxx"}
            image={"/assets/places/clinicaNorte.png"}
            title={"Clínica Norte"}
            titleColor={null}
            description={null}
            displayTitle={true}
            displayDescription={false}
            border={true}
            shadow={true}
          />
          <Card
            key={"x3xxx"}
            image={"/assets/places/clinicaSur.jpg"}
            title={"Clínica Sur"}
            titleColor={null}
            description={null}
            displayTitle={true}
            displayDescription={false}
            border={true}
            shadow={true}
          />
        </div>
      </section>
    </main>
  );
}
