"use client";

import { useEffect, useState } from "react";

export default function SpecialtiesCrud() {
  const [specialties, setSpecialties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState({
    name: "",
    description: "",
  });

  // Obtener especialidades
  useEffect(() => {
    fetchSpecialties();
  }, []);

  async function fetchSpecialties() {
    try {
      setLoading(true);
      const res = await fetch("/specialties");
      if (!res.ok) throw new Error("Error al obtener especialidades");
      const data = await res.json();
      setSpecialties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // --- Edición existente ---
  function handleEdit(specialty) {
    setEditingId(specialty._id);
    setFormData({
      name: specialty.name,
      description: specialty.description || "",
    });
  }

  function handleCancel() {
    setEditingId(null);
    setFormData({ name: "", description: "" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(id) {
    try {
      const res = await fetch("/specialties", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...formData }),
      });
      if (!res.ok) throw new Error("Error al actualizar la especialidad");
      await fetchSpecialties();
      handleCancel();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar esta especialidad?")) return;
    try {
      const res = await fetch("/specialties", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar la especialidad");
      await fetchSpecialties();
    } catch (err) {
      alert(err.message);
    }
  }

  // --- Modal de creación ---
  function openModal() {
    setShowModal(true);
    setNewSpecialty({ name: "", description: "" });
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleNewSpecialtyChange(e) {
    const { name, value } = e.target;
    setNewSpecialty((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreateSpecialty() {
    if (!newSpecialty.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      const res = await fetch("/specialties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSpecialty),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear la especialidad");
      }
      await fetchSpecialties();
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Cargando especialidades...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lista de Especialidades</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Crear nueva especialidad
        </button>
      </div>

      <ul className="space-y-4">
        {specialties.map((spec) => (
          <li
            key={spec._id}
            className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            {editingId === spec._id ? (
              <>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="block w-full mb-2 p-2 border rounded"
                />
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className="block w-full mb-2 p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(spec._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{spec.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {spec.description || "No especificada"}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(spec)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(spec._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              Crear nueva especialidad
            </h2>
            <input
              name="name"
              value={newSpecialty.name}
              onChange={handleNewSpecialtyChange}
              placeholder="Nombre"
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              name="description"
              value={newSpecialty.description}
              onChange={handleNewSpecialtyChange}
              placeholder="Descripción (opcional)"
              className="block w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCreateSpecialty}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Crear
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
