
const Page = () => {
  const doctors = [
    {
      name: "Dra. Ana López",
      healthInsurances: [],
      _id: "1",
      email: "ana.lopez@example.com",
      phone: "+34111222333",
      createdAt: "2025-09-15T19:57:38.823Z",
      __v: 0
    },
    {
      name: "Dra. Pablo López",
      healthInsurances: [],
      _id: "2",
      email: "pablo.lopez@example.com",
      phone: "+34111222334",
      createdAt: "2025-09-15T19:57:38.823Z",
      __v: 0
    },
    {
      name: "Dra. Ramona López",
      healthInsurances: [],
      _id: "3",
      email: "ramona.lopez@example.com",
      phone: "+34111222335",
      createdAt: "2025-09-15T19:57:38.823Z",
      __v: 0
    }
  ];

  return (
    <div className="border p-3 flex flex-col gap-3">

      {doctors.map((doctor) => (

        <div className='border card'>
           <h1 key={doctor._id}>{doctor.email}</h1>
           <p>{doctor.phone}</p>
        </div>

      ))}
    </div>
  );
};

export default Page;

