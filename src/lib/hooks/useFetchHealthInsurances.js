import { useState, useEffect } from "react";

/**
 * Hook personalizado para obtener y cachear "obras sociales" (health insurances).
 * - Usa localStorage para cachear.
 * - Verifica si los datos del servidor son distintos antes de actualizar.
 * - Compatible con Next.js (evita SSR).
 */
export function useFetchHealthInsurances() {
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Evitar ejecución en SSR
    if (typeof window === "undefined") return;

    async function fetchHealthInsurances() {
      try {
        const stored = localStorage.getItem("healthInsurances");
        let parsedStored = null;

        if (stored) {
          parsedStored = JSON.parse(stored);
          setHealthInsurances(parsedStored);
        }

        // Pedir datos nuevos al servidor
        const res = await fetch("/healthinsurances");
        if (!res.ok) throw new Error("Error al obtener las obras sociales");

        const data = await res.json();

        // Comparar datos nuevos con los guardados
        const storedString = JSON.stringify(parsedStored);
        const dataString = JSON.stringify(data);

        if (storedString !== dataString) {
          // Solo actualizar si hay diferencias reales
          setHealthInsurances(data);
          localStorage.setItem("healthInsurances", JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHealthInsurances();
  }, []);

  return { healthInsurances, loading, error };
}
