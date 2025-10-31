"use client";

import { useState, useEffect, useMemo } from "react";

export default function ReservationsCrud() {
  const [reservations, setReservations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [reservationForm, setReservationForm] = useState({
    _id: null,
    dni: "",
    patientName: "",
    specialty: "",
    healthInsurance: "",
    date: "",
    appointment: "",
    doctor: "",
  });

  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // --- Fetch inicial ---
  useEffect(() => {
    fetchData("/reservations", setReservations);
    fetchData("/doctors", setDoctors);
    fetchData("/specialties", setSpecialties);
    fetchData("/healthinsurances", setHealthInsurances);
    fetchData("/appointments", setAppointments);
  }, []);

  async function fetchData(url, setter) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error al obtener ${url}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(err);
    }
  }

  // --- Manejo del formulario ---
  function handleFormChange(e) {
    const { name, value } = e.target;

    setReservationForm((prev) => ({ ...prev, [name]: value }));

    if (name === "healthInsurance") {
      setReservationForm((prev) => ({
        ...prev,
        specialty: "",
        doctor: "",
        date: "",
        appointment: "",
      }));
    }
    if (name === "specialty") {
      setReservationForm((prev) => ({
        ...prev,
        doctor: "",
        date: "",
        appointment: "",
      }));
    }
    if (name === "date") {
      setReservationForm((prev) => ({
        ...prev,
        appointment: "",
      }));
    }
  }

  function openForm(res = null) {
    if (res) {
      setReservationForm({
        _id: res._id,
        dni: res.dni,
        patientName: res.patientName,
        specialty: res.specialty?._id || "",
        healthInsurance: res.healthInsurance?._id || "",
        date: res.appointment
          ? new Date(res.appointment.dateTime).toISOString().split("T")[0]
          : "",
        appointment: res.appointment?._id || "",
        doctor: res.doctor?._id || "",
      });
      setEditing(true);
    } else {
      setReservationForm({
        _id: null,
        dni: "",
        patientName: "",
        specialty: "",
        healthInsurance: "",
        date: "",
        appointment: "",
        doctor: "",
      });
      setEditing(false);
    }
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(false);
  }

  // --- FILTROS ---

  // 1️⃣ Filtrar doctores por especialidad y obra social
  const filteredDoctors = useMemo(() => {
    if (!reservationForm.specialty || !reservationForm.healthInsurance)
      return [];

    const specId = reservationForm.specialty.toString();
    const insId = reservationForm.healthInsurance.toString();

    return doctors.filter((d) => {
      const doctorSpecIds = (d.specialty || []).map((s) => s._id?.toString());
      const doctorInsIds = (d.healthInsurances || []).map((h) =>
        h._id?.toString(),
      );

      return doctorSpecIds.includes(specId) && doctorInsIds.includes(insId);
    });
  }, [reservationForm.specialty, reservationForm.healthInsurance, doctors]);

  // 2️⃣ Filtrar turnos por fecha + doctores válidos
  const filteredAppointments = useMemo(() => {
    if (!reservationForm.date || filteredDoctors.length === 0) return [];

    const dateStart = new Date(reservationForm.date);
    dateStart.setHours(0, 0, 0, 0);
    const dateEnd = new Date(reservationForm.date);
    dateEnd.setHours(23, 59, 59, 999);

    return appointments.filter((a) => {
      if (!a.available) return false;
      if (!a.doctor?._id) return false;

      const apptDoctorId = a.doctor._id.toString();
      const doctor = filteredDoctors.find(
        (d) => d._id.toString() === apptDoctorId,
      );

      if (!doctor) return false;

      const doctorSpecIds = (doctor.specialty || []).map((s) =>
        s._id?.toString(),
      );
      if (!doctorSpecIds.includes(reservationForm.specialty.toString()))
        return false;

      const apptDate = new Date(a.dateTime);
      return apptDate >= dateStart && apptDate <= dateEnd;
    });
  }, [
    reservationForm.date,
    filteredDoctors,
    appointments,
    reservationForm.specialty,
  ]);

  // --- Submit ---
  async function handleSubmit() {
    const url = "/reservations";
    const method = editing ? "PATCH" : "POST";
    const body = editing
      ? {
          id: reservationForm._id,
          dni: reservationForm.dni,
          patientName: reservationForm.patientName,
          specialty: reservationForm.specialty,
          healthInsurance: reservationForm.healthInsurance,
          appointment: reservationForm.appointment,
          doctor: reservationForm.doctor,
        }
      : {
          dni: reservationForm.dni,
          patientName: reservationForm.patientName,
          specialty: reservationForm.specialty,
          healthInsurance: reservationForm.healthInsurance,
          appointment: reservationForm.appointment,
          doctor: reservationForm.doctor,
        };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al guardar reserva");
      }
      fetchData("/reservations", setReservations);
      closeForm();
    } catch (err) {
      alert(err.message);
    }
  }

  // --- Delete ---
  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar esta reserva?")) return;
    try {
      const res = await fetch("/reservations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar reserva");
      fetchData("/reservations", setReservations);
    } catch (err) {
      alert(err.message);
    }
  }

  // 3️⃣ Cuando el usuario selecciona una hora, guardamos también el doctor del turno elegido
  useEffect(() => {
    if (!reservationForm.appointment) return;
    const appt = appointments.find(
      (a) => a._id === reservationForm.appointment,
    );
    if (appt?.doctor?._id) {
      setReservationForm((prev) => ({ ...prev, doctor: appt.doctor._id }));
    }
  }, [reservationForm.appointment, appointments]);

  // --- UI ---
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Reservas</h1>
      <button
        onClick={() => openForm()}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Agregar Reserva
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Paciente</th>
            <th className="border px-4 py-2">DNI</th>
            <th className="border px-4 py-2">Médico</th>
            <th className="border px-4 py-2">Especialidad</th>
            <th className="border px-4 py-2">Obra Social</th>
            <th className="border px-4 py-2">Turno</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan={7} className="border px-4 py-2 text-center">
                No hay reservas.
              </td>
            </tr>
          ) : (
            reservations.map((r) => (
              <tr key={r._id}>
                <td className="border px-2 py-1">{r.patientName}</td>
                <td className="border px-2 py-1">{r.dni}</td>
                <td className="border px-2 py-1">
                  {r.doctor?.firstName} {r.doctor?.lastName}
                </td>
                <td className="border px-2 py-1">{r.specialty?.name}</td>
                <td className="border px-2 py-1">{r.healthInsurance?.name}</td>
                <td className="border px-2 py-1">
                  {r.appointment
                    ? new Date(r.appointment.dateTime).toLocaleString()
                    : ""}
                </td>
                <td className="border px-2 py-1 flex gap-1">
                  <button
                    onClick={() => openForm(r)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 z-[3000] flex justify-center items-start pt-20 bg-black/50 backdrop-blur-sm p-2 overflow-auto">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
              {editing ? "Editar Reserva" : "Nueva Reserva"}
            </h2>

            <div className="space-y-3">
              <input
                name="patientName"
                value={reservationForm.patientName}
                onChange={handleFormChange}
                placeholder="Nombre y apellido del paciente"
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="dni"
                value={reservationForm.dni}
                onChange={handleFormChange}
                placeholder="DNI"
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="healthInsurance"
                value={reservationForm.healthInsurance}
                onChange={handleFormChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar obra social</option>
                {healthInsurances.map((hi) => (
                  <option key={hi._id} value={hi._id}>
                    {hi.name}
                  </option>
                ))}
              </select>

              <select
                name="specialty"
                value={reservationForm.specialty}
                onChange={handleFormChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar especialidad</option>
                {specialties.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="date"
                value={reservationForm.date}
                onChange={handleFormChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="appointment"
                value={reservationForm.appointment}
                onChange={handleFormChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar hora</option>
                {filteredAppointments.map((a) => {
                  const doctorName = `${a.doctor.firstName} ${a.doctor.lastName}`;
                  const timeString = new Date(a.dateTime).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" },
                  );
                  return (
                    <option key={a._id} value={a._id}>
                      {timeString} ({doctorName})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t pt-4">
              <button
                onClick={closeForm}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
