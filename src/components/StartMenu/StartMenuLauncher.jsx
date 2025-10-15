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
        className='flex justify-center items-center p-2 rounded-md cursor-pointer lg:hidden'
      >
        <span className="w-3 h-3 flex justify-center items-center">
          <FontAwesomeIcon icon={startMenu ? faXmark : faBars} className='text-[1.5rem]' />
        </span>

      </button>
  );
};

export default StartMenuLauncher;
