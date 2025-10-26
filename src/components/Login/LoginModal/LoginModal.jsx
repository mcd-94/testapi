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
    <nav
      className={`
        ${loginModal ? "block" : "hidden"}
        rounded-b-md
        bg-white
        p-3
        border border-blue-400
        flex flex-col
        gap-3
      `}
    >
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="contraseña"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
          className="border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
        >
          {loading ? "Accediendo..." : "Entrar"}
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
    </nav>
  );
};

export default LoginModal;
