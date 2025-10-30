// src/components/HealthInsurancesCrud.jsx
"use client";

import { useEffect, useState } from "react";

export default function HealthInsurancesCrud() {
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    url: "",
    discount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newHI, setNewHI] = useState({
    name: "",
    description: "",
    image: "",
    url: "",
    discount: 0,
  });

  // --- Obtener todas las obras sociales ---
  useEffect(() => {
    fetchHealthInsurances();
  }, []);

  async function fetchHealthInsurances() {
    try {
      setLoading(true);
      const res = await fetch("/healthinsurances");
      if (!res.ok) throw new Error("Error al obtener obras sociales");
      const data = await res.json();
      setHealthInsurances(data);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }

  // --- Edición ---
  function handleEdit(hi) {
    setEditingId(hi._id);
    setFormData({
      name: hi.name,
      description: hi.description,
      image: hi.image,
      url: hi.url || "",
      discount: hi.discount || 0,
    });
  }

  function handleCancel() {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      url: "",
      discount: 0,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "discount" ? parseFloat(value) || 0 : value,
    }));
  }

  async function handleSave(id) {
    try {
      const res = await fetch("/healthinsurances", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...formData }),
      });
      if (!res.ok) throw new Error("Error al actualizar la obra social");
      await fetchHealthInsurances();
      handleCancel();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar esta obra social?")) return;
    try {
      const res = await fetch("/healthinsurances", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar la obra social");
      await fetchHealthInsurances();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  }

  // --- Funciones de carga de archivos ---
  function handleFileUpload(e, setState) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setState((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  // --- Modal de creación ---
  function openModal() {
    setShowModal(true);
    setNewHI({ name: "", description: "", image: "", url: "", discount: 0 });
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleNewHIChange(e) {
    const { name, value } = e.target;
    setNewHI((prev) => ({
      ...prev,
      [name]: name === "discount" ? parseFloat(value) || 0 : value,
    }));
  }

  async function handleCreateHI() {
    if (!newHI.name.trim()) {
      setError("El nombre es obligatorio");
      setTimeout(() => setError(null), 3000);
      return;
    }
    try {
      const res = await fetch("/healthinsurances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHI),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al crear la obra social");
      }
      await fetchHealthInsurances();
      closeModal();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  }

  // --- Cerrar modal con tecla Escape ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (showModal) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  // --- Renderizado ---
  if (loading) return <p>Cargando obras sociales...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lista de Obras Sociales</h1>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Crear nueva obra social
        </button>
      </div>

      {error && (
        <p className="text-red-600 font-medium bg-red-100 border border-red-300 rounded p-2">
          {error}
        </p>
      )}

      <ul className="space-y-4">
        {healthInsurances.map((hi) => (
          <li
            key={hi._id}
            className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            {editingId === hi._id ? (
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
                <input
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="URL de sitio web"
                  className="block w-full mb-2 p-2 border rounded"
                />
                <input
                  name="discount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="Descuento (%)"
                  className="block w-full mb-2 p-2 border rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setFormData)}
                  className="block w-full mb-2 p-2 border rounded"
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(hi._id)}
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
                <h2 className="text-xl font-semibold">{hi.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {hi.description || "No especificada"}
                </p>
                {hi.url && (
                  <a
                    href={hi.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Ir al sitio web
                  </a>
                )}
                {hi.discount > 0 && (
                  <p className="text-green-600 font-medium">
                    Descuento: {hi.discount}%
                  </p>
                )}
                {hi.image && (
                  <img
                    src={hi.image}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(hi)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(hi._id)}
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

      {/* --- Modal de creación --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Crear nueva obra social</h2>
            <input
              name="name"
              value={newHI.name}
              onChange={handleNewHIChange}
              placeholder="Nombre"
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              name="description"
              value={newHI.description}
              onChange={handleNewHIChange}
              placeholder="Descripción (opcional)"
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              name="url"
              value={newHI.url}
              onChange={handleNewHIChange}
              placeholder="URL de sitio web"
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              name="discount"
              type="number"
              min="0"
              step="0.01"
              value={newHI.discount}
              onChange={handleNewHIChange}
              placeholder="Descuento (%)"
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setNewHI)}
              className="block w-full mb-2 p-2 border rounded"
            />

            {newHI.image && (
              <img
                src={newHI.image}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCreateHI}
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
