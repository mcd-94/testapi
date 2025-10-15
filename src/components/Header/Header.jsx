'use client';
import React from "react";
import StartMenuLauncher from "@/components/StartMenu/StartMenuLauncher";
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import StartMenu from "@/components/StartMenu/StartMenu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faUsers} from "@/lib/icons.js";

const Header = () => {
  const startMenu = useSelector((state) => state.startMenu.isOpen);

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

        <Link href="/">
          <img src="/assets/branding/logoHeader.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        <StartMenuLauncher />
        <nav className='hidden lg:block'>
          <ul className='flex gap-20'>
            <li><Link href='/about'>About</Link></li>
            <li><Link href='/about'>About</Link></li>
            <li><Link href='/about'>Contact</Link></li>
            <li><Link href='/about'>Login</Link></li>
          </ul>
        </nav>
      </header>

      <div className={`
        mx-1.5
        sm:mx-2
        lg:mx-2.5
      `}>
        <StartMenu/>
      </div>

    </div>
  );
};

export default Header;
