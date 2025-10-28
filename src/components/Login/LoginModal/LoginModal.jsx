"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleLoginModal } from "@/store/loginModalSlice";
import { setSession } from "@/store/userSessionSlice";

const LoginModal = () => {
  const loginModal = useSelector((state) => state.loginModal.isOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Comprobando credenciales...");
    setMessageType("");
    setLoading(true);

    try {
      // 1️⃣ Login
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: userPassword,
        }),
      });

      if (!response.ok) throw new Error("Usuario o contraseña incorrectos");
      const data = await response.json();

      console.log("🔹 Login OK:", data);

      // 2️⃣ Fetch de detalles del usuario
      const userDetailsRes = await fetch(
        `https://dummyjson.com/users/${data.id}`,
      );
      if (!userDetailsRes.ok)
        throw new Error("Error al obtener detalles del usuario");
      const userDetails = await userDetailsRes.json();

      console.log("🔹 Detalles usuario:", userDetails);

      // 3️⃣ Combinar ambos objetos (data + userDetails)
      const fullUser = { ...userDetails, token: data.token };

      console.log("✅ Usuario completo guardado:", fullUser);

      // 4️⃣ Guardar en sessionStorage
      sessionStorage.setItem("token", fullUser.token);
      sessionStorage.setItem("user", JSON.stringify(fullUser));

      // 5️⃣ Actualizar Redux
      dispatch(setSession());

      setMessage("Acceso correcto. Redirigiendo...");
      setMessageType("success");

      setTimeout(() => {
        dispatch(toggleLoginModal());
        setUserName("");
        setUserPassword("");
        setMessage("");
        setMessageType("");
        // Redirección según rol del usuario
        if (fullUser.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      }, 800);
    } catch (error) {
      console.error("❌ Error:", error);
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        ${loginModal ? "block" : "hidden"}
        rounded-b-md
        p-3
        border border-[#4297cb]
        flex flex-col
        gap-3
        bg-[url('/assets/branding/fondo.jpg')]
        bg-repeat
        md:px-100
      `}
    >
      <div className="flex flex-col justify-center items-center">
        <img
          src="/assets/branding/logoSF.png"
          alt="logo"
          className={`
            w-[50%] h-full
            md:w-[40%]
            `}
        />
        <p className="text-2xl md:text-3xl text-[#005f99] font-bold">
          Accede a tu cuenta
        </p>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-bold">
            Correo electrónico
          </label>
          <input
            type="text"
            placeholder="usuario"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="border border-[#c0c0c0] bg-white rounded-md px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-bold">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="contraseña"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            className="border border-[#c0c0c0] bg-white rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#4297cb] text-white font-bold rounded-md py-2 hover:bg-blue-700 transition"
        >
          {loading ? "Accediendo..." : "Iniciar Sesión"}
        </button>

        {message && (
          <div
            className={`mt-3 text-sm ${
              messageType === "error"
                ? "text-red-600"
                : messageType === "success"
                  ? "text-green-600"
                  : "text-gray-600"
            }`}
          >
            {message}
          </div>
        )}
      </form>

      <p className="text-xs text-gray-500 text-center">
        Ejemplo: <code>emilys / emilyspass</code>
      </p>
    </div>
  );
};

export default LoginModal;
