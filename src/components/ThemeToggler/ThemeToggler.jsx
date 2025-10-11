'use client'

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun} from "@/lib/icons.js";


const ThemeToggler = () => {
  const theme = useSelector((state) => state.theme.theme);
  console.log(theme)
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="rounded-md cursor-pointer border"
    >
      <FontAwesomeIcon icon={theme === "light" ? faSun: faMoon} size="2x" />
    </button>
  );
};

export default ThemeToggler;
