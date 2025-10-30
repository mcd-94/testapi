"use client";

import { useState, useEffect } from "react";

// ==========================
// COMPONENTE PRINCIPAL CRUD
// ==========================
export default function AppointmentsCrud() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("all");

  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    dateTime: "",
    durationMinutes: 30,
    available: true,
  });

  // ==========================
  // FETCH DATA
  // ==========================
  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await fetch("/appointments");
      if (!res.ok) throw new Error("Error al obtener turnos");
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      alert(err.message);
    }
  }

  async function fetchDoctors() {
    try {
      const res = await fetch("/doctors");
      if (!res.ok) throw new Error("Error al obtener doctores");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      alert(err.message);
    }
  }

  // ==========================
  // HANDLERS
  // ==========================
  function openCreateModal() {
    setEditing(null);
    setNewAppointment({
      doctor: "",
      dateTime: "",
      durationMinutes: 30,
      available: true,
    });
    setShowModal(true);
  }

  function openEditModal(app) {
    setEditing(app);
    setNewAppointment({
      doctor: app.doctor?._id || "",
      dateTime: new Date(app.dateTime).toISOString().slice(0, 16),
      durationMinutes: app.durationMinutes,
      available: app.available,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditing(null);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ==========================
  // CREATE / UPDATE / DELETE
  // ==========================
  async function handleSave() {
    if (!newAppointment.doctor || !newAppointment.dateTime) {
      alert("Doctor y fecha/hora son obligatorios");
      return;
    }

    try {
      const method = editing ? "PATCH" : "POST";
      const payload = editing
        ? { ...newAppointment, id: editing._id }
        : newAppointment;

      const res = await fetch("/appointments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al guardar turno");
      }

      await fetchAppointments();
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar este turno?")) return;
    try {
      const res = await fetch("/appointments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar turno");
      await fetchAppointments();
    } catch (err) {
      alert(err.message);
    }
  }

  // ==========================
  // FILTROS
  // ==========================
  const filteredAppointments = appointments.filter((a) => {
    const matchesDoctor = !filterDoctor || a.doctor?._id === filterDoctor;
    const matchesAvailable =
      filterAvailable === "all"
        ? true
        : filterAvailable === "true"
          ? a.available
          : !a.available;
    return matchesDoctor && matchesAvailable;
  });

  // ==========================
  // RENDER
  // ==========================
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Turnos</h1>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <select
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos los doctores</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.firstName} {d.lastName}
            </option>
          ))}
        </select>

        <select
          value={filterAvailable}
          onChange={(e) => setFilterAvailable(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Todos los estados</option>
          <option value="true">Disponibles</option>
          <option value="false">Ocupados</option>
        </select>

        <button
          onClick={openCreateModal}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Nuevo turno
        </button>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Doctor</th>
              <th className="border px-3 py-2">Fecha y hora</th>
              <th className="border px-3 py-2">Duración (min)</th>
              <th className="border px-3 py-2">Disponible</th>
              <th className="border px-3 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  No hay turnos que coincidan con los filtros.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">
                    {a.doctor
                      ? `${a.doctor.firstName} ${a.doctor.lastName}`
                      : "-"}
                  </td>
                  <td className="border px-2 py-1">
                    {new Date(a.dateTime).toLocaleString()}
                  </td>
                  <td className="border px-2 py-1">{a.durationMinutes}</td>
                  <td className="border px-2 py-1">
                    {a.available ? "✅ Sí" : "❌ No"}
                  </td>
                  <td className="border px-2 py-1 flex gap-2">
                    <button
                      onClick={() => openEditModal(a)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(a._id)}
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
      </div>

      {/* MODAL */}
      {showModal && (
        <CreateAppointmentModal
          doctors={doctors}
          appointment={newAppointment}
          onChange={handleChange}
          onSave={handleSave}
          onClose={closeModal}
          editing={!!editing}
        />
      )}
    </div>
  );
}

// ==========================
// MODAL DE CREACIÓN / EDICIÓN
// ==========================
function CreateAppointmentModal({
  doctors,
  appointment,
  onChange,
  onSave,
  onClose,
  editing,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[3000]">
      <div className="bg-white rounded-lg shadow-2xl w-[90%] sm:w-[500px] p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          {editing ? "Editar turno" : "Nuevo turno"}
        </h2>

        <div className="space-y-3">
          {/* Doctor */}
          <select
            name="doctor"
            value={appointment.doctor}
            onChange={onChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccione un doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.firstName} {d.lastName}
              </option>
            ))}
          </select>

          {/* Fecha y hora */}
          <input
            type="datetime-local"
            name="dateTime"
            value={appointment.dateTime}
            onChange={onChange}
            className="w-full border p-2 rounded"
          />

          {/* Duración */}
          <input
            type="number"
            name="durationMinutes"
            value={appointment.durationMinutes}
            onChange={onChange}
            placeholder="Duración (minutos)"
            className="w-full border p-2 rounded"
          />

          {/* Disponible */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={appointment.available}
              onChange={onChange}
            />
            <span>Disponible</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-5 border-t pt-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
