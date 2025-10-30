"use client";

export default function CreateTurnModal({
  title,
  turn,
  doctors,
  handleChange,
  handleSubmit,
  handleClose,
}) {
  return (
    <div className="fixed inset-0 z-[3000] flex justify-center bg-black/50 backdrop-blur-sm p-1">
      <div className="w-full flex justify-center p-5">
        <div className="bg-white rounded-md shadow-2xl w-[100%] p-6 sm:p-8 overflow-auto max-h-[90vh] animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            {title}
          </h2>

          <div className="space-y-3">
            <select
              name="doctor"
              value={turn.doctor}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Seleccionar doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
            </select>

            <input
              name="patientName"
              value={turn.patientName}
              onChange={handleChange}
              placeholder="Nombre del paciente"
              className="w-full p-2 border rounded-lg"
            />

            <input
              type="datetime-local"
              name="date"
              value={turn.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />

            <textarea
              name="reason"
              value={turn.reason}
              onChange={handleChange}
              placeholder="Motivo del turno"
              className="w-full p-2 border rounded-lg resize-none"
            />

            <select
              name="status"
              value={turn.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
