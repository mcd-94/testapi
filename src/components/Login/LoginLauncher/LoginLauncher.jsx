"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignIn, faXmark } from "@/lib/icons.js";

import { useSelector, useDispatch } from "react-redux";
import { toggleLoginModal } from "@/store/loginModalSlice";
import { closeStartMenu } from "@/store/startMenuSlice";

const LoginLauncher = ({ showIcon }) => {
  const loginModal = useSelector((state) => state.loginModal.isOpen);
  const startMenu = useSelector((state) => state.startMenu.isOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (startMenu) {
      dispatch(closeStartMenu());
      dispatch(toggleLoginModal());
    } else {
      dispatch(toggleLoginModal());
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center rounded-md cursor-pointer"
    >
      {showIcon ? (
        <FontAwesomeIcon
          icon={loginModal ? faXmark : faUser}
          className="text-[1.5rem]"
        />
      ) : (
        "Log in"
      )}
    </button>
  );
};

export default LoginLauncher;
