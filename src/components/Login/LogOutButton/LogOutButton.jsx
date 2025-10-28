"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@/lib/icons.js";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal } from "@/store/loginModalSlice";
import { closeStartMenu } from "@/store/startMenuSlice";
import { setSession, clearSession } from "@/store/userSessionSlice";

const LogOutButton = ({ showIcon }) => {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ Next.js router

  // Sync Redux with sessionStorage on mount
  useEffect(() => {
    dispatch(setSession());
  }, [dispatch]);

  // Handler to logout
  const handleLogoutClick = () => {
    dispatch(closeLoginModal());
    dispatch(closeStartMenu());
    dispatch(clearSession());
    router.push("/"); // ✅ redirect to home page
  };

  return (
    <button
      onClick={handleLogoutClick}
      className="block flex justify-center items-center rounded-md cursor-pointer text-red-500"
    >
      {showIcon && (
        <FontAwesomeIcon icon={faUser} className="text-[1.5rem] mr-2" />
      )}
      Log Out
    </button>
  );
};

export default LogOutButton;
