"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@/lib/icons.js";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal, closeLoginModal } from "@/store/loginModalSlice";
import { closeStartMenu } from "@/store/startMenuSlice";
import { setSession, clearSession } from "@/store/userSessionSlice";
const LogInButton = ({ showIcon, asHandler = false }) => {
  const userSession = useSelector((state) => state.userSession.userSession);
  const startMenu = useSelector((state) => state.startMenu.isOpen);
  const loginModal = useSelector((state) => state.loginModal.isOpen);
  const dispatch = useDispatch();

  // Sync Redux with sessionStorage on mount
  useEffect(() => {
    dispatch(setSession());
  }, [dispatch]);

  // Handler to open login modal
  const handleLoginClick = () => {
    if (!userSession && startMenu) dispatch(closeStartMenu()); // logical AND
    if (loginModal) {
      dispatch(closeLoginModal());
    } else {
      dispatch(openLoginModal());
    }
  };

  // Return handler only if requested
  if (asHandler) return handleLoginClick;

  // Determine button text and color

  return (
    <div>
      <button
        onClick={handleLoginClick}
        className={`block flex justify-center items-center rounded-md cursor-pointer`}
      >
        Log In
      </button>
    </div>
  );
};

export default LogInButton;
