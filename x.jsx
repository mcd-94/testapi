import { useState, useEffect } from "react";

// Esta es una "custom hook" de React.
// Una hook es una función que nos permite usar estado y otras funciones de React dentro de componentes funcionales.
// Esta hook se llama useFetchSpecialties y su trabajo es traerse las "especialidades" desde una API.
export function useFetchSpecialties() {
  // Creamos tres variables de estado usando useState:
  const [specialties, setSpecialties] = useState([]); // Guardamos las especialidades que trae la API
  const [loading, setLoading] = useState(true); // Guardamos si estamos cargando datos
  const [error, setError] = useState(null); // Guardamos si hubo algún error al traer los datos

  // useEffect nos permite ejecutar código cuando el componente se monta (o cambia algo)
  useEffect(() => {
    // Definimos una función asincrónica para traer las especialidades
    async function fetchSpecialties() {
      try {
        // Primero intentamos leer desde localStorage (almacenamiento del navegador)
        // Esto evita pedirle a la API datos que ya tenemos guardados
        const stored = localStorage.getItem("specialties");
        if (stored) {
          // Si encontramos algo, lo parseamos de JSON y lo guardamos en el estado
          const parsed = JSON.parse(stored);
          setSpecialties(parsed);
          setLoading(false);
          return; // Terminamos la función porque ya tenemos los datos
        }

        // Si no hay datos guardados, hacemos fetch a la API
        // fetch es la manera de "pedirle cosas a un servidor" en JS
        const res = await fetch("/specialties"); // Esto le pide a la API la lista de especialidades
        if (!res.ok) throw new Error("Error al obtener las especialidades"); // Si hubo un error, lo tiramos

        // Cuando la API nos responde con éxito, necesitamos "leer" los datos
        // res.json() convierte la respuesta de la API (JSON) a un objeto JS
        const data = await res.json();
        setSpecialties(data); // Guardamos las especialidades en el estado
        // También las guardamos en localStorage para no pedirlas de nuevo la próxima vez
        localStorage.setItem("specialties", JSON.stringify(data));
      } catch (err) {
        // Si hubo algún error, lo guardamos en el estado y lo mostramos en consola
        setError(err.message);
        console.error(err);
      } finally {
        // Esto se ejecuta siempre, haya habido error o no, y sirve para sacar el loading
        setLoading(false);
      }
    }

    // Solo ejecutamos fetch en el cliente, no en el servidor
    if (typeof window !== "undefined") {
      fetchSpecialties(); // Llamamos a la función que hace el fetch
    }
  }, []); // Dependencias vacías: esto se ejecuta solo cuando el componente se monta

  // Finalmente devolvemos los datos, el estado de carga y los errores
  // Esto permite que cualquier componente que use esta hook sepa si estamos cargando, si hubo error y qué datos tenemos
  return { specialties, loading, error };
}
