import Hero from '@/components/Hero/Hero';
import Card from "@/components/Card/Card";

export const metadata = {
  title: 'Institucional - MEDICALIDW',
  description: 'Atención médica cercana, confiable y de excelencia.'
};

export default function Page() {

  // Acá se puede escribir JavaScript

  return (
    <div>
      
      {/* Uso el componente Hero que importé del directorio de componentes */}
    {
      /*
        <Hero
          title='Sobre nosotros'
          img='places/surgeryRoom.png'
        />
      */
    }

     <Hero
          title='Sobre nosotros'
          bg='assets/heroBackgrounds/aboutPage.jpg'
        />

      <section className='missionSection border border-blue-500 flex flex-col gap-3 m-3 p-3'>
        
        <div className='border'>

          <header>Nuestra Misión</header>
          
          <p>
            En MEDICALIDW, nuestra misión es mejorar la calidad de vida de las personas a través de una atención médica cercana, confiable y de excelencia.
          </p>

        </div>

        <div>
          
          <img
            src='places/surgeryRoom.png'
            alt=""
            className='rounded-md'
          />

        </div>

      </section>

      <section className='ourClinicsSection border'>

          <header>Nuestras clínicas</header>
          
          <p>
            En MEDICALIDW, nuestra misión es mejorar la calidad de vida de las personas a través de una atención médica cercana, confiable y de excelencia.
          </p>

        <div className='cardContainer flex gap-3'>
    
    {/* Puedo usar JavaScript dentro de JSX */}
    {
      console.log('Usar JavaScript')
    }

          <div className='border card flex flex-col jutify-center items-center border rounded-md shadow-lg px-3'>

            <h3 className='border font-bold'>Clínica Norte</h3>

            <img
              src='clinics/clinicaNorte.png'
              alt=""
              className='rounded-md'
            />

            <h4 className='font-bold'>Especialidades:</h4>
            <ul className='border list-[square]'>
            <li>Pediatría</li>
            <li>Cardiología</li>
            <li>Dermatología</li>
            </ul>

          </div>
 
           <div className='border card flex flex-col jutify-center items-center border rounded-md shadow-lg pt-1'>

            <h3>Clínica Norte</h3>

            <img
              src='clinics/clinicaNorte.png'
              alt=""
              className='rounded-md'
            />

            <h4 className='font-bold'>Especialidades:</h4>
            <ul className='border list-[square]'>
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

