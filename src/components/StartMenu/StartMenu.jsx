import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleStartMenu } from "@/store/startMenuSlice";
import { navMenuRoutes } from "@/lib/navMenuRoutes.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import LogOutButton from "@/components/Login/LogOutButton/LogOutButton";
import LogInButton from "@/components/Login/LogInButton/LogInButton";

const StartMenu = () => {
  const startMenu = useSelector((state) => state.startMenu.isOpen);
  const userSession = useSelector((state) => state.userSession.userSession);
  const dispatch = useDispatch();

  return (
    <nav
      className={`
      ${startMenu ? "block" : "hidden"}
      rounded-b-md
      bg-[#ffffff]
      p-3
      border border-[#4297cb]
      flex
      flex-col
      gap-3
    `}
    >
      <ul className="flex flex-col gap-3">
        {navMenuRoutes.map((e) => (
          <li key={e.title}>
            <Link
              href={e.route}
              onClick={() => dispatch(toggleStartMenu())}
              className="rounded-md p-3 block bg-[#4297cb] text-[#ffffff] font-bold text-lg"
            >
              <FontAwesomeIcon icon={e.faIcon} size="lg" className="mr-3" />
              <span>{e.title}</span>
            </Link>
          </li>
        ))}
        <li
          key="454lknlksn"
          onClick={LogInButton({ asHandler: true })}
          className="rounded-md block bg-[#4297cb] text-[#ffffff] p-3 font-bold text-lg cursor-pointer"
        >
          {userSession ? <LogOutButton /> : <LogInButton />}
        </li>{" "}
      </ul>
    </nav>
  );
};

export default StartMenu;
