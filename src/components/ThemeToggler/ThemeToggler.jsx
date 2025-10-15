'use client'

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun} from "@/lib/icons.js";


const ThemeToggler = () => {

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="rounded-md cursor-pointer"
    >
      <FontAwesomeIcon icon={theme === "light" ? faSun: faMoon} size="lg" />
    </button>
  );
};

export default ThemeToggler;
