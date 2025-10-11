import React from "react";
import StartMenuLauncher from "@/components/StartMenu/StartMenuLauncher";
import LanguageSetter from "@/components/LanguageSetter/LanguageSetter";
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import Image from 'next/image'

const Header = () => {
  return (
    <>
      <header className="bg-[#4297cb] text-[#ffffff] border rounded-md flex justify-between items-center p-5 mb-5">
        <StartMenuLauncher />
        <img src="/logos/logoHeader.png" alt="Logo" className="h-10 w-auto" />
        <div className="flex gap-5">
          <ThemeToggler />
        </div>
      </header>
    </>
  );
};

export default Header;
