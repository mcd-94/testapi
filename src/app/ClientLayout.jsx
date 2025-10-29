"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { setSession } from "@/store/userSessionSlice";
import StartMenu from "@/components/StartMenu/StartMenu";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ClientLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSession());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default ClientLayout;
