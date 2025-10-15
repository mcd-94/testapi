

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleStartMenu } from "@/store/startMenuSlice";
import { navMenuRoutes } from '@/lib/navMenuRoutes.js';
import ThemeToggler from '@/components/ThemeToggler/ThemeToggler'

const StartMenu = () => {
  const startMenu = useSelector((state) => state.startMenu.isOpen);
  const dispatch = useDispatch();
  

  return (
    <nav className={`
      ${startMenu ? "block" : "hidden"}
      rounded-b-md
      bg-[#ffffff]
      p-3
      border border-[#4297cb]
      flex
      flex-col
      gap-3
    `}>
      <ul className='flex flex-col gap-3'>
      {navMenuRoutes.map((route) => (
          <li key={route.title}>
            <Link
              href={route.route}
              onClick={() => dispatch(toggleStartMenu())}
              className='rounded-md p-3 block bg-[#4297cb] text-[#ffffff] font-bold text-lg'
            >
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className='border rounded-md p-3'>
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default StartMenu;

