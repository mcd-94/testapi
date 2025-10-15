
"use client";

import { useState } from "react";

// Base de datos simulada de usuarios
const users = [
  {
    userName: "jorge.perez86",
    userPassword: "pass1234",
    userRole: "client",
  },
  {
    userName: "ramona77",
    userPassword: "pass1234",
    userRole: "admin",
  },
];

export default function Page() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("Comprobando credenciales...");
    setMessageType("");

    setTimeout(() => {
      // Busca un usuario válido en el array
      const foundUser = users.find(
        (u) => u.userName === userName && u.userPassword === userPassword
      );

      if (foundUser) {
        setUserRole(foundUser.userRole);
        setMessage("Acceso correcto. Redirigiendo...");
        setMessageType("success");

        setTimeout(() => {
          setLoggedIn(true);
          setMessage("");
        }, 800);
      } else {
        setMessage("Usuario o contraseña incorrectos");
        setMessageType("error");
        setUserPassword("");
      }
    }, 700);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName("");
    setUserPassword("");
    setUserRole("");
    setMessage("");
    setMessageType("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {!loggedIn ? (
        <section
          id="loginView"
          className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center"
        >
          <h1 className="text-2xl font-bold mb-2">Iniciar sesión</h1>
          <p className="text-gray-600 mb-4">
            Introduce tus credenciales. Este es un mockup; no es seguro.
          </p>

          <form
            id="loginForm"
            onSubmit={handleLogin}
            className="flex flex-col gap-3"
          >
            <input
              id="username"
              name="username"
              type="text"
              placeholder="usuario"
              required
              aria-label="Usuario"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="contraseña"
              required
              aria-label="Contraseña"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <button
              className="btn bg-blue-600 text-white rounded-lg py-2 mt-2 hover:bg-blue-700 transition"
              type="submit"
            >
              Entrar
            </button>

            {message && (
              <div
                id="message"
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

          <p className="text-xs text-gray-500 mt-4">
            ramona77 / pass1234
            jorge.perez86 / pass1234
          </p>
        </section>
      ) : (
        <section
          id="dashboardView"
          className="bg-white shadow-md rounded-2xl p-8 max-w-2xl w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold">{userName}</div>
                <div className="text-sm text-gray-500">
                  Rol: <span id="whoami">{userRole}</span>
                </div>
              </div>
            </div>
            <button
              id="logoutBtn"
              onClick={handleLogout}
              className="btn bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg"
            >
              Cerrar sesión
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-3">Panel de control</h2>
          <p className="text-gray-500 mb-4">
            Bienvenido, {userName}. Tu rol es <strong>{userRole}</strong>.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border rounded-xl p-4">
              <strong>Actividad</strong>
              <div className="text-gray-500 text-sm">
                Sin actividad real (mockup)
              </div>
            </div>
            <div className="border rounded-xl p-4">
              <strong>Configuración</strong>
              <div className="text-gray-500 text-sm">Opciones simuladas</div>
            </div>
          </div>

          <footer className="text-center text-gray-400 text-sm">
            © 2025 Mockup. Página simulada para pruebas.
          </footer>
        </section>
      )}
    </main>
  );
}

