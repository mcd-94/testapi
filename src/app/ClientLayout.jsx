"use client"; // Esto le dice a Next.js que este componente se ejecuta en el cliente (navegador)

// Importamos el Header y Footer que forman la estructura de la página
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Importamos funciones de Redux para manejar la sesión del usuario
import { setSession } from "@/store/userSessionSlice";
import { useDispatch } from "react-redux";

// useEffect nos permite ejecutar código cuando el componente se monta
import { useEffect } from "react";

// Importamos nuestras custom hooks que traen datos desde la API
import { useFetchSpecialties } from "@/lib/hooks/useFetchSpecialties";
import { useFetchHealthInsurances } from "@/lib/hooks/useFetchHealthInsurances";

// Este es el layout que se usa para páginas de clientes
const ClientLayout = ({ children }) => {
  const dispatch = useDispatch(); // Permite enviar acciones a Redux

  // Inicializa la sesión del usuario apenas se monta el componente
  // Esto es como decirle al sistema: "Che, fijate si el usuario ya está logueado"
  useEffect(() => {
    dispatch(setSession()); // Ejecuta la acción de Redux para setear la sesión
  }, [dispatch]);

  // Usamos la hook que explicamos antes para traer las especialidades desde la API
  const {
    specialties,
    loading: loadingSpecialties,
    error: errorSpecialties,
  } = useFetchSpecialties();

  // Hacemos lo mismo con las obras sociales / aseguradoras de salud
  const {
    healthInsurances,
    loading: loadingHealthInsurances,
    error: errorHealthInsurances,
  } = useFetchHealthInsurances();

  // Si cualquiera de las dos APIs aún está cargando, mostramos un spinner
  // Esto es como decirle al usuario: "esperá un toque que estamos trayendo los datos"
  if (loadingSpecialties || loadingHealthInsurances) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Spinner animado */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-6"></div>

        {/* Texto de carga */}
        <h1 className="text-xl font-semibold text-gray-700 mb-2">
          Cargando datos...
        </h1>
      </div>
    );
  }

  // Si ya cargaron los datos, mostramos el layout completo
  // Esto incluye el header, el contenido de la página y el footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
