export default function DoctorCardList({ doctors, onEdit, onDelete }) {
  if (doctors.length === 0) {
    return (
      <p className="text-center border p-4">
        No hay doctores que coincidan con la búsqueda o filtros.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:hidden">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="border rounded-lg p-3 shadow-sm bg-white flex flex-col gap-2"
        >
          <div>
            <h2 className="text-lg font-semibold">
              {doctor.firstName} {doctor.lastName}
            </h2>
            <p className="text-sm text-gray-500">
              Matrícula: {doctor.licenseNumber || "-"}
            </p>
          </div>

          {doctor.specialty?.length > 0 && (
            <p className="text-sm">
              <strong>Especialidades:</strong>{" "}
              {doctor.specialty.map((s) => s.name).join(", ")}
            </p>
          )}

          {doctor.healthInsurances?.length > 0 && (
            <p className="text-sm">
              <strong>Obras Sociales:</strong>{" "}
              {doctor.healthInsurances.map((h) => h.name).join(", ")}
            </p>
          )}

          {doctor.description && (
            <p className="text-sm text-gray-700">{doctor.description}</p>
          )}

          <p className="text-sm">
            <strong>Email:</strong> {doctor.email || "-"}
          </p>
          <p className="text-sm">
            <strong>Teléfono:</strong> {doctor.phone || "-"}
          </p>
          <p className="text-sm">
            <strong>Consulta:</strong> ${doctor.consultationFee}
          </p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(doctor)}
              className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(doctor._id)}
              className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
