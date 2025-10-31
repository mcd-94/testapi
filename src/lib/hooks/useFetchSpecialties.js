import { useState, useEffect } from "react";

/**
 * Hook personalizado para obtener y cachear "especialidades".
 * - Usa localStorage para evitar peticiones innecesarias.
 * - Verifica si los datos nuevos del servidor son diferentes antes de actualizar.
 */
export function useFetchSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Evitamos ejecutar en el servidor (Next.js SSR)
    if (typeof window === "undefined") return;

    async function fetchSpecialties() {
      try {
        const stored = localStorage.getItem("specialties");
        let parsedStored = null;

        if (stored) {
          parsedStored = JSON.parse(stored);
          setSpecialties(parsedStored);
        }

        // Pedimos datos nuevos de la API
        const res = await fetch("/specialties");
        if (!res.ok) throw new Error("Error al obtener las especialidades");

        const data = await res.json();

        // Comprobamos si los datos son distintos a los guardados
        const storedString = JSON.stringify(parsedStored);
        const dataString = JSON.stringify(data);

        if (storedString !== dataString) {
          // Solo actualizamos si hay cambios reales
          setSpecialties(data);
          localStorage.setItem("specialties", JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSpecialties();
  }, []);

  return { specialties, loading, error };
}
