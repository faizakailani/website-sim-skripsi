import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import DrawerMobile from "../Drawer";
import { NavLink } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { Tooltip } from "@material-tailwind/react";
// import UserService from "../../services/service/UserService";

const NavbarComponent = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50flex bg-blue shadow-md m-1 text-bw rounded-md">
        <div className="flex items-center justify-between w-full px-3 bg-deep-blue">
          <h1 className="m-2 font-bold tracking-widest">
            Selamat Datang
          </h1>
          <div className="hidden md:block">
            <NavLink to={"/profile"}>
              <Tooltip content="Profil">
                <div className="border-2 border-bw h-8 w-8 rounded-full flex justify-center items-center">
                  <BsPersonFill />
                </div>
              </Tooltip>
            </NavLink>
          </div>
          <button
            onClick={openDrawer}
            className="lg:hidden m-2  hover:bg-navy active:bg-navy transition-all ease-linear duration-150 h-8 rounded-lg flex items-center justify-center gap-2 px-3"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </header>
      <DrawerMobile open={open} closeDrawer={closeDrawer} />
    </>
  );
};

export default NavbarComponent;
