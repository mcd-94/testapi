'use client'
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark} from "@/lib/icons.js";

import { useSelector, useDispatch } from "react-redux";
import { toggleStartMenu } from "@/store/startMenuSlice";

const StartMenuLauncher = () => {
  const startMenu = useSelector((state) => state.startMenu.isOpen);
  const dispatch = useDispatch();

  return (
        <button
        onClick={() => dispatch(toggleStartMenu())}
        className='border px-3 py-1 rounded-md hover:border-red-500 cursor-pointer'>
        <FontAwesomeIcon icon={startMenu === true ? faXmark: faBars} size="2x" />
        </button>
  );
};

export default StartMenuLauncher;
