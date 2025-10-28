"use client";
import StartMenuLauncher from "@/components/StartMenu/StartMenuLauncher";
import StartMenu from "@/components/StartMenu/StartMenu";
import LogInButton from "@/components/Login/LogInButton/LogInButton";
import LoginModal from "@/components/Login/LoginModal/LoginModal";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSession } from "@/store/userSessionSlice";
import { faUser } from "@/lib/icons.js";
import { closeStartMenu } from "@/store/startMenuSlice";
import { closeLoginModal } from "@/store/loginModalSlice";

const Header = () => {
  const dispatch = useDispatch();
  const startMenu = useSelector((state) => state.startMenu.isOpen);
  const userSession = useSelector((state) => state.userSession.userSession);

  const loginModal = useSelector((state) => state.loginModal.isOpen);

  const [scrollDir, setScrollDir] = useState("up");

  // Sync Redux with sessionStorage on mount
  useEffect(() => {
    dispatch(setSession());
  }, [dispatch]);

  // Detect scroll direction
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = startMenu || loginModal ? "hidden" : "auto";
  }, [startMenu, loginModal]);

  // 🔹 Cerrar menú al presionar ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && (startMenu || loginModal)) {
        dispatch(closeStartMenu());
        dispatch(closeLoginModal());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, startMenu, loginModal]);
  const handleBackdropClick = () => {
    dispatch(closeStartMenu());
    dispatch(closeLoginModal());
  };

  return (
    <>
      <div
        className={`flex flex-col fixed left-0 top-0 right-0 z-50 transition-transform duration-300 ${
          scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <header
          className={`
            ${startMenu || loginModal ? "rounded-t-md" : "rounded-md"}
            bg-[#4297cb]
            text-white
            border
            border-[#4297cb]
            flex
            justify-between
            items-center
            m-1.5 sm:x-2 lg:mx-2.5 mb-0
            py-2
            px-2.5
          `}
        >
          <StartMenuLauncher />
          <Link
            href="/"
            onClick={() => {
              dispatch(closeStartMenu());
              dispatch(closeLoginModal());
            }}
          >
            <img
              src="/assets/branding/logoHeader.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>
          {userSession ? (
            <Link
              href="/admin"
              onClick={() => {
                dispatch(closeStartMenu());
              }}
            >
              <FontAwesomeIcon icon={faUser} className="text-[1.5rem]" />
            </Link>
          ) : (
            <LogInButton showIcon={true} />
          )}
        </header>

        <div className="mx-1.5 sm:mx-2 lg:mx-2.5 relative z-50">
          <StartMenu />
          <LoginModal />
        </div>
      </div>
      {(startMenu || loginModal) && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-[1]"
        />
      )}
    </>
  );
};

export default Header;
