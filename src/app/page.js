// Esta es la entrada principal de la página, la "Home Page".
import Hero from '@/components/Hero/Hero'

export default function Home() {
  return (
    <div>
      <main>
        <Hero
          title=''
          bg="assets/heroBackgrounds/homePage.jpg"
          logo="assets/branding/logoCompletoSF.png"
          bookingButton="true"
        />
      </main>
    </div>
  );
}
