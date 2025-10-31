import { useState, useEffect } from "react";

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [healthInsurances, setHealthInsurances] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchSpecialty();
    fetchHealthInsurances();
  }, []);

  async function fetchDoctors() {
    try {
      const res = await fetch("/doctors");
      if (!res.ok) throw new Error("Error al obtener doctores");
      setDoctors(await res.json());
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function fetchSpecialty() {
    try {
      const res = await fetch("/specialties");
      if (!res.ok) throw new Error("Error al obtener especialidades");
      setSpecialty(await res.json());
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchHealthInsurances() {
    try {
      const res = await fetch("/healthinsurances");
      if (!res.ok) throw new Error("Error al obtener obras sociales");
      setHealthInsurances(await res.json());
    } catch (err) {
      console.error(err);
    }
  }

  async function createDoctor(payload) {
    const res = await fetch("/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al crear el doctor");
    await fetchDoctors();
  }

  async function updateDoctor(payload) {
    const res = await fetch("/doctors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al actualizar el doctor");
    await fetchDoctors();
  }

  async function deleteDoctor(id) {
    if (!confirm("¿Seguro que deseas eliminar este doctor?")) return;
    const res = await fetch("/doctors", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Error al eliminar doctor");
    await fetchDoctors();
  }

  return {
    doctors,
    specialty,
    healthInsurances,
    fetchDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  };
}
