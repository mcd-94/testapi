import { useState, useEffect } from "react";

export function useFetchSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Esta función se ejecuta solo en el cliente
    async function fetchSpecialties() {
      try {
        // Intentar leer desde localStorage (solo disponible en cliente)
        const stored = localStorage.getItem("specialties");
        if (stored) {
          const parsed = JSON.parse(stored);
          setSpecialties(parsed);
          setLoading(false);
          return; // No hace falta pedir al servidor
        }

        // Si no hay datos guardados, hacemos fetch
        const res = await fetch("/specialties");
        if (!res.ok) throw new Error("Error al obtener las especialidades");

        const data = await res.json();
        setSpecialties(data);
        localStorage.setItem("specialties", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // Solo se ejecuta en el cliente
    if (typeof window !== "undefined") {
      fetchSpecialties();
    }
  }, []);

  return { specialties, loading, error };
}
