import Hero from '@/components/Hero/Hero'
function Page ( ) {

const doctores = [
  {
    name: 'Carlos',
    id: 1
  },
  {
    name: 'Felipe',
    id: 2
  },
  {
    name: 'los',
    id: 1
  },
  {
    name: 'elipe',
    id: 2
  },
  {
    name: 'arls',
    id: 1
  }]

return (
<main className={`
  border
  bg-[#000080]
  m-3
  flex
  flex-col
  gap-3
  `}>
<Hero
  title='hola'
  />
  {
    doctores.map((doctor) => (
      <Hero
      title={doctor.name}
      />
    ))
  }

  </main>
)

}

export default Page
