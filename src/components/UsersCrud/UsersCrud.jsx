"use client";
import { useState } from "react";
import CreateUserModal from "@/components/CreateUserModal/CreateUserModal";

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    healthInsurances: [],
    image: "",
  });

  const [healthInsurances, setHealthInsurances] = useState([
    { _id: "1", name: "OSDE" },
    { _id: "2", name: "Swiss Medical" },
    { _id: "3", name: "Medicus" },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Manejo especial para checkboxes
    if (name === "healthInsurances") {
      setNewUser((prev) => {
        const alreadySelected = prev.healthInsurances.includes(value);
        return {
          ...prev,
          healthInsurances: alreadySelected
            ? prev.healthInsurances.filter((id) => id !== value)
            : [...prev.healthInsurances, value],
        };
      });
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Error al crear usuario");
        return;
      }

      alert("Usuario creado correctamente");
      setShowModal(false);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        healthInsurances: [],
        image: "",
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Nuevo Usuario
      </button>

      {showModal && (
        <CreateUserModal
          newUser={newUser}
          healthInsurances={healthInsurances}
          handleChange={handleChange}
          handleCreate={handleCreate}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
