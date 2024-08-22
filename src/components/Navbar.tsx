import { NavLink, useLocation } from "react-router-dom";
import { GridViewRounded } from "@mui/icons-material";
const Navbar = () => {
  const currPath = useLocation().pathname;
  return (
    <div>
      <nav className="w-60 p-2 h-1/2 bg-white">
        <ul className="ml-4 mt-4 flex flex-col gap-2">
          <li>
            <NavLink
              to="/overview"
              className={({ isActive }) =>
                isActive
                  ? "text-dark_violet inline-block p-2 w-full cursor-default"
                  : "text-black inline-block p-2 w-full cursor-pointer"
              }
            >
              <GridViewRounded
                fontSize="medium"
                className={`text-white ${
                  currPath == "/overview" ? "bg-dark_violet" : "bg-black"
                } rounded-md p-1`}
              />
              <span className="ml-2 font-semibold text-base">Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/people_directory"
              className={({ isActive }) =>
                isActive
                  ? "text-dark_violet inline-block p-2 w-full cursor-default"
                  : "text-black inline-block p-2 w-full cursor-pointer"
              }
            >
              <GridViewRounded
                fontSize="medium"
                className={`text-white ${
                  currPath == "/people_directory"
                    ? "bg-dark_violet"
                    : "bg-black"
                } rounded-md p-1`}
              />
              <span className="ml-2 font-semibold text-base">
                People Directory
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
