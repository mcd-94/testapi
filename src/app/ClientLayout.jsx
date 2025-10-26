"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { setSession } from "@/store/userSessionSlice";
import StartMenu from "@/components/StartMenu/StartMenu";
import { useState, useEffect } from "react";
const ClientLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Leer usuario del sessionStorage
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Header />
      <div>{children}</div>

      <Footer />
    </>
  );
};

export default ClientLayout;
