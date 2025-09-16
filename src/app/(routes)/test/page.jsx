"use client";
import { useEffect, useState } from "react";

export default function page() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "https://medicalidwapi.vercel.app/doctors"; // Cambia si tu backend no está en localhost

  // Cargar doctores
  const fetchDoctors = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      setMessage("Error cargando doctores: " + err.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Manejo de inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(editingId ? "Doctor actualizado" : "Doctor creado");
        setForm({ name: "", specialty: "", email: "", phone: "" });
        setEditingId(null);
        fetchDoctors();
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (err) {
      setMessage("Error de conexión: " + err.message);
    }
  };

  // Editar doctor
  const handleEdit = (doctor) => {
    setForm({
      name: doctor.name,
      specialty: doctor.specialty,
      email: doctor.email,
      phone: doctor.phone,
    });
    setEditingId(doctor._id);
  };

  // Borrar doctor
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres borrar este doctor?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage("Doctor borrado");
        fetchDoctors();
      } else {
        const data = await res.json();
        setMessage("Error: " + data.message);
      }
    } catch (err) {
      setMessage("Error de conexión: " + err.message);
    }
  };

  return (
    <div>
      <h1>Dashboard de Doctores</h1>
      {message && <p>{message}</p>}

      <h2>{editingId ? "Editar Doctor" : "Agregar Nuevo Doctor"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="specialty"
          placeholder="Especialidad"
          value={form.specialty}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      <h2>Lista de Doctores</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.specialty}</td>
              <td>{d.email}</td>
              <td>{d.phone}</td>
              <td>
                <button onClick={() => handleEdit(d)}>Editar</button>
                <button onClick={() => handleDelete(d._id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
