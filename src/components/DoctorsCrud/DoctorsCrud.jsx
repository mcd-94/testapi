"use client";
import { useState, useEffect } from "react";
import CreateDoctorModal from "@/components/CreateDoctorModal/CreateDoctorModal";
// src/components/DoctorsCrud/DoctorsCrud.jsx
export default function DoctorsCrud() {
  const handleClick = () => {
    console.log("Botón dentro de DoctorsCrud clickeado");
  };
  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    firstName: "",
    lastName: "",
    licenseNumber: "",
    email: "",
    phone: "",
    specialty: [],
    healthInsurances: [],
    description: "",
    consultationFee: "",
    image: "",
  });
  const [editingDoctorData, setEditingDoctorData] = useState(null);

  // Filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialties, setFilterSpecialties] = useState([]);
  const [filterHealthInsurances, setFilterHealthInsurances] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchSpecialty();
    fetchHealthInsurances();
  }, []);

  async function fetchDoctors() {
    try {
      const res = await fetch("/doctors");
      if (!res.ok) throw new Error("Error al obtener doctores");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function fetchSpecialty() {
    try {
      const res = await fetch("/specialties");
      if (!res.ok) throw new Error("Error al obtener especialidades");
      const data = await res.json();
      setSpecialty(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchHealthInsurances() {
    try {
      const res = await fetch("/healthinsurances");
      if (!res.ok) throw new Error("Error al obtener obras sociales");
      const data = await res.json();
      setHealthInsurances(data);
    } catch (err) {
      console.error(err);
    }
  }

  function openCreateModal() {
    setShowCreateModal(true);
  }
  function closeCreateModal() {
    setShowCreateModal(false);
    setNewDoctor({
      firstName: "",
      lastName: "",
      licenseNumber: "",
      email: "",
      phone: "",
      specialty: [],
      healthInsurances: [],
      description: "",
      consultationFee: "",
      image: "",
    });
  }

  function openEditModal(doctor) {
    setEditingDoctorData({
      ...doctor,
      specialty: doctor.specialty?.map((s) => s._id) || [],
      healthInsurances: doctor.healthInsurances?.map((h) => h._id) || [],
    });
    setShowEditModal(true);
  }

  function closeEditModal() {
    setShowEditModal(false);
    setEditingDoctorData(null);
  }

  function handleNewDoctorChange(e) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setNewDoctor((prev) => {
        const updated = prev[name].includes(value)
          ? prev[name].filter((v) => v !== value)
          : [...prev[name], value];
        return { ...prev, [name]: updated };
      });
    } else {
      setNewDoctor((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleEditDoctorChange(e) {
    const { name, value, type } = e.target;
    if (!editingDoctorData) return;
    if (type === "checkbox") {
      setEditingDoctorData((prev) => {
        const updated = prev[name].includes(value)
          ? prev[name].filter((v) => v !== value)
          : [...prev[name], value];
        return { ...prev, [name]: updated };
      });
    } else {
      setEditingDoctorData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleCreateDoctor() {
    if (!newDoctor.firstName.trim() || !newDoctor.lastName.trim()) {
      alert("Nombre y apellido son obligatorios");
      return;
    }

    if (!newDoctor.consultationFee || !newDoctor.licenseNumber) {
      alert("Nombre, apellido y matricula son obligatorios");
      return;
    }

    try {
      const payload = {
        firstName: newDoctor.firstName.trim(),
        lastName: newDoctor.lastName.trim(),
        licenseNumber: newDoctor.licenseNumber,
        consultationFee: newDoctor.consultationFee,
        description: newDoctor.description || "",
        email: newDoctor.email?.trim() || "",
        phone: newDoctor.phone?.trim() || "",
        specialty: newDoctor.specialty,
        healthInsurances: newDoctor.healthInsurances,
        image: newDoctor.image || "",
      };

      const res = await fetch("/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear el doctor");
      }

      await fetchDoctors();
      closeCreateModal();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleSaveEdit() {
    if (!editingDoctorData) return;

    try {
      const payload = {
        id: editingDoctorData._id,
        firstName: editingDoctorData.firstName.trim(),
        lastName: editingDoctorData.lastName.trim(),
        licenseNumber: editingDoctorData.licenseNumber,
        description: editingDoctorData.description.trim(),
        email: editingDoctorData.email?.trim() || "",
        phone: editingDoctorData.phone?.trim() || "",
        specialty: editingDoctorData.specialty,
        healthInsurances: editingDoctorData.healthInsurances,
        consultationFee: editingDoctorData.consultationFee,
        image: editingDoctorData.image || "",
      };

      const res = await fetch("/doctors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al actualizar el doctor");
      }

      await fetchDoctors();
      closeEditModal();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar este doctor?")) return;
    try {
      const res = await fetch("/doctors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar doctor");
      await fetchDoctors();
    } catch (err) {
      alert(err.message);
    }
  }

  // Filtrado en vivo
  const filteredDoctors = doctors.filter((doctor) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      doctor.firstName.toLowerCase().includes(term) ||
      doctor.lastName.toLowerCase().includes(term) ||
      (doctor.licenseNumber?.toString() || "").includes(term);

    const matchesSpecialty =
      filterSpecialties.length === 0 ||
      doctor.specialty?.some((s) => filterSpecialties.includes(s._id));

    const matchesHealthInsurance =
      filterHealthInsurances.length === 0 ||
      doctor.healthInsurances?.some((h) =>
        filterHealthInsurances.includes(h._id),
      );

    return matchesSearch && matchesSpecialty && matchesHealthInsurance;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Doctores</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o matrícula"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mb-2 md:mb-0"
        />

        {/* Filtro de Especialidades */}
        <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
          {specialty.map((s) => (
            <label key={s._id} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={s._id}
                checked={filterSpecialties.includes(s._id)}
                onChange={(e) => {
                  const val = e.target.value;
                  setFilterSpecialties((prev) =>
                    prev.includes(val)
                      ? prev.filter((id) => id !== val)
                      : [...prev, val],
                  );
                }}
              />
              {s.name}
            </label>
          ))}
        </div>

        {/* Filtro de Obras Sociales */}
        <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
          {healthInsurances.map((h) => (
            <label key={h._id} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={h._id}
                checked={filterHealthInsurances.includes(h._id)}
                onChange={(e) => {
                  const val = e.target.value;
                  setFilterHealthInsurances((prev) =>
                    prev.includes(val)
                      ? prev.filter((id) => id !== val)
                      : [...prev, val],
                  );
                }}
              />
              {h.name}
            </label>
          ))}
        </div>

        <button
          onClick={openCreateModal}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar nuevo Doctor
        </button>
      </div>

      {/* Tabla de doctores */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Matrícula</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Teléfono</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Especialidades</th>
              <th className="border px-4 py-2">Obras Sociales</th>
              <th className="border px-4 py-2">Precio de consulta</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan="8" className="border px-4 py-2 text-center">
                  No hay doctores que coincidan con la búsqueda o filtros.
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">
                    {doctor.firstName} {doctor.lastName}
                  </td>
                  <td className="border px-2 py-1">
                    {doctor.licenseNumber || "-"}
                  </td>
                  <td className="border px-2 py-1">{doctor.email || "-"}</td>
                  <td className="border px-2 py-1">{doctor.phone || "-"}</td>
                  <td className="border px-2 py-1">
                    {doctor.description || "-"}
                  </td>
                  <td className="border px-2 py-1">
                    {doctor.specialty?.length > 0
                      ? doctor.specialty.map((s) => s.name).join(", ")
                      : "-"}
                  </td>
                  <td className="border px-2 py-1">
                    {doctor.healthInsurances?.length > 0
                      ? doctor.healthInsurances.map((h) => h.name).join(", ")
                      : "-"}
                  </td>
                  <td className="border px-2 py-1">{doctor.consultationFee}</td>
                  <td className="border px-2 py-1 flex gap-1">
                    <button
                      onClick={() => openEditModal(doctor)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(doctor._id)}
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

      {/* Modal de creación */}
      {showCreateModal && (
        <CreateDoctorModal
          newDoctor={newDoctor}
          specialty={specialty}
          healthInsurances={healthInsurances}
          handleChange={handleNewDoctorChange}
          handleCreate={handleCreateDoctor}
          handleClose={closeCreateModal}
        />
      )}

      {/* Modal de edición */}
      {showEditModal && editingDoctorData && (
        <CreateDoctorModal
          newDoctor={editingDoctorData}
          specialty={specialty}
          healthInsurances={healthInsurances}
          handleChange={handleEditDoctorChange}
          handleCreate={handleSaveEdit}
          handleClose={closeEditModal}
        />
      )}
    </div>
  );
}
