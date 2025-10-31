"use client";
import { useMemo } from "react";

export default function CreateReservationModal({
  reservation,
  doctors,
  specialties,
  healthInsurances,
  appointments,
  handleChange,
  handleCreate,
  handleClose,
}) {
  // Filtrar especialidades disponibles según obra social y médicos
  const filteredSpecialties = useMemo(() => {
    if (!reservation.healthInsurance) return [];

    const selectedInsurance = reservation.healthInsurance.toString();

    const specialtyIds = new Set(
      doctors
        .filter((d) =>
          d.healthInsurances
            .map((h) => h.toString())
            .includes(selectedInsurance),
        )
        .flatMap((d) => d.specialty.map((s) => s.toString())),
    );

    return specialties.filter((s) => specialtyIds.has(s._id.toString()));
  }, [reservation.healthInsurance, doctors, specialties]);

  // Filtrar médicos según especialidad y obra social
  const filteredDoctors = useMemo(() => {
    if (!reservation.specialty || !reservation.healthInsurance) return [];

    const selectedInsurance = reservation.healthInsurance.toString();
    const selectedSpecialty = reservation.specialty.toString();

    return doctors.filter(
      (d) =>
        d.specialty.map((s) => s.toString()).includes(selectedSpecialty) &&
        d.healthInsurances.map((h) => h.toString()).includes(selectedInsurance),
    );
  }, [reservation.specialty, reservation.healthInsurance, doctors]);

  // Filtrar turnos según médico seleccionado
  const filteredAppointments = useMemo(() => {
    if (!reservation.doctor) return [];
    return appointments.filter(
      (a) =>
        a.available && a.doctor.toString() === reservation.doctor.toString(),
    );
  }, [reservation.doctor, appointments]);

  return (
    <div className="fixed inset-0 z-[3000] flex justify-center bg-black/50 backdrop-blur-sm p-1">
      <div className="w-full flex justify-center p-5">
        <div className="bg-white rounded-md shadow-2xl w-[100%] p-6 sm:p-8 overflow-auto max-h-[90vh] animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            {reservation._id ? "Editar Reserva" : "Nueva Reserva"}
          </h2>

          <div className="space-y-3">
            {/* Nombre del paciente */}
            <input
              name="patientName"
              value={reservation.patientName}
              onChange={handleChange}
              placeholder="Nombre y apellido del paciente"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            {/* Obra social */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Obra Social
              </label>
              <select
                name="healthInsurance"
                value={reservation.healthInsurance}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar obra social</option>
                {healthInsurances.map((hi) => (
                  <option key={hi._id} value={hi._id}>
                    {hi.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Especialidad */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Especialidad
              </label>
              <select
                name="specialty"
                value={reservation.specialty}
                onChange={handleChange}
                disabled={!reservation.healthInsurance}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar especialidad</option>
                {filteredSpecialties.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Médico */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Médico
              </label>
              <select
                name="doctor"
                value={reservation.doctor}
                onChange={handleChange}
                disabled={!reservation.specialty}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar médico</option>
                {filteredDoctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.firstName} {d.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Turno */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Turno disponible
              </label>
              <select
                name="appointment"
                value={reservation.appointment}
                onChange={handleChange}
                disabled={!reservation.doctor}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar turno</option>
                {filteredAppointments.map((a) => (
                  <option key={a._id} value={a._id}>
                    {new Date(a.dateTime).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
