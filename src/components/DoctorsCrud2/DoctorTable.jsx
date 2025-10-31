export default function DoctorTable({ doctors, onEdit, onDelete }) {
  if (doctors.length === 0) {
    return (
      <p className="text-center border p-4">
        No hay doctores que coincidan con la búsqueda o filtros.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {[
              "Nombre",
              "Matrícula",
              "Email",
              "Teléfono",
              "Descripción",
              "Especialidades",
              "Obras Sociales",
              "Precio",
              "Acciones",
            ].map((header) => (
              <th key={header} className="border px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">
                {doctor.firstName} {doctor.lastName}
              </td>
              <td className="border px-2 py-1">
                {doctor.licenseNumber || "-"}
              </td>
              <td className="border px-2 py-1">{doctor.email || "-"}</td>
              <td className="border px-2 py-1">{doctor.phone || "-"}</td>
              <td className="border px-2 py-1">{doctor.description || "-"}</td>
              <td className="border px-2 py-1">
                {doctor.specialty?.map((s) => s.name).join(", ") || "-"}
              </td>
              <td className="border px-2 py-1">
                {doctor.healthInsurances?.map((h) => h.name).join(", ") || "-"}
              </td>
              <td className="border px-2 py-1">{doctor.consultationFee}</td>
              <td className="border px-2 py-1 flex gap-1">
                <button
                  onClick={() => onEdit(doctor)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(doctor._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
