"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { setSession } from "@/store/userSessionSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useFetchSpecialties } from "@/lib/hooks/useFetchSpecialties";
import { useFetchHealthInsurances } from "@/lib/hooks/useFetchHealthInsurances";

const ClientLayout = ({ children }) => {
  const dispatch = useDispatch();

  // Inicializa la sesión del usuario
  useEffect(() => {
    dispatch(setSession());
  }, [dispatch]);

  // Ejecuta ambos hooks para cargar y guardar datos en localStorage
  const {
    specialties,
    loading: loadingSpecialties,
    error: errorSpecialties,
  } = useFetchSpecialties();

  const {
    healthInsurances,
    loading: loadingHealthInsurances,
    error: errorHealthInsurances,
  } = useFetchHealthInsurances();

  // Mostrar loading si cualquiera de los dos aún está cargando
  if (loadingSpecialties || loadingHealthInsurances) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-6"></div>

          {/* Texto de carga */}
          <h1 className="text-xl font-semibold text-gray-700 mb-2">
            Cargando datos...
          </h1>
          <p className="text-gray-500">
            Estamos preparando todo para ti. Esto no tomará mucho.
          </p>
        </div>
      </div>
    );
  }

  // Mostrar error si alguno falla
  if (errorSpecialties || errorHealthInsurances) {
    return (
      <div className="text-center p-4 text-red-600">
        Error al cargar los datos:
        <br />
        {errorSpecialties && <span>- Especialidades: {errorSpecialties}</span>}
        <br />
        {errorHealthInsurances && (
          <span>- Obras Sociales: {errorHealthInsurances}</span>
        )}
      </div>
    );
  }

  // Layout principal
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
