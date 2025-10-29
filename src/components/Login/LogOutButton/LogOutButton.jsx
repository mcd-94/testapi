"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@/lib/icons.js";
import { useDispatch } from "react-redux";
import { closeStartMenu } from "@/store/startMenuSlice";
import { clearSession } from "@/store/userSessionSlice";

const LogOutButton = ({ showIcon }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(closeStartMenu());
    dispatch(clearSession());
    router.push("/");
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex justify-center items-center rounded-md cursor-pointer text-white"
      >
        {showIcon && (
          <FontAwesomeIcon icon={faUser} className="text-[1.5rem] mr-2" />
        )}
        Log Out
      </button>

      {showModal && (
        <div className="fixed inset-0 h-[100vh] flex justify-center bg-black/50 z-200">
          <div className="bg-white rounded-md shadow-lg h-[50%] max-w-sm mt-10 flex flex-col justify-center items-center gap-5 px-20 py-10">
            <div className="text-black border text-center">
              <p className="text-2xl">¿Cerrar sesión?</p>
            </div>
            <div className="text-black border">
              <button
                className="text-black border"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className="text-black border" onClick={handleLogout}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogOutButton;
