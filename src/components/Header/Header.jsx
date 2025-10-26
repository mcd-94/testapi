"use client";
import React, { useEffect } from "react";
import StartMenuLauncher from "@/components/StartMenu/StartMenuLauncher";
import StartMenu from "@/components/StartMenu/StartMenu";
import LoginLauncher from "@/components/Login/LoginLauncher/LoginLauncher";
import LoginModal from "@/components/Login/LoginModal/LoginModal";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setSession } from "@/store/userSessionSlice";
import { faXmark, faUser } from "@/lib/icons.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeStartMenu } from "@/store/startMenuSlice";

const Header = () => {
  const dispatch = useDispatch();
  const startMenu = useSelector((state) => state.startMenu.isOpen);
  const userSession = useSelector((state) => state.userSession.userSession);

  // <-- Sincronizar Redux con sessionStorage al montar
  useEffect(() => {
    dispatch(setSession());
  }, [dispatch]);

  return (
    <div className="flex flex-col fixed left-0 top-0 right-0 z-50">
      <header
        className={`
          ${startMenu ? "rounded-t-md" : "rounded-md"}
          bg-[#4297cb]
          text-white
          border
          border-[#4297cb]
          flex
          justify-between
          items-center
          p-1.5 m-1.5 mb-0
          sm:p-2 sm:m-2 lg:mb-0
          lg:p-2.5 lg:m-2.5 lg:mb-0
        `}
      >
        <StartMenuLauncher />
        <Link href="/" onClick={() => dispatch(closeStartMenu())}>
          <img
            src="/assets/branding/logoHeader.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </Link>
        {userSession ? (
          <Link
            href="/dashboard"
            onClick={() => {
              dispatch(closeStartMenu());
            }}
          >
            <FontAwesomeIcon icon={faUser} className="text-[1.5rem]" />
          </Link>
        ) : (
          <LoginLauncher showIcon={true} />
        )}
      </header>

      <div className="mx-1.5 sm:mx-2 lg:mx-2.5">
        <StartMenu />
        <LoginModal />
      </div>
    </div>
  );
};

export default Header;
