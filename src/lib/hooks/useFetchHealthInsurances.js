import { useState, useEffect } from "react";

export function useFetchHealthInsurances() {
  const [healthInsurances, setHealthInsurances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se ejecuta solo en el cliente
    async function fetchHealthInsurances() {
      try {
        // Intentar leer desde localStorage (solo disponible en cliente)
        const stored = localStorage.getItem("healthInsurances");
        if (stored) {
          const parsed = JSON.parse(stored);
          setHealthInsurances(parsed);
          setLoading(false);
          return; // No hace falta pedir al servidor
        }

        // Si no hay datos guardados, hacemos fetch
        const res = await fetch("/healthinsurances");
        if (!res.ok) throw new Error("Error al obtener las obras sociales");

        const data = await res.json();
        setHealthInsurances(data);
        localStorage.setItem("healthInsurances", JSON.stringify(data));
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (typeof window !== "undefined") {
      fetchHealthInsurances();
    }
  }, []);

  return { healthInsurances, loading, error };
}
