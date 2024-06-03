import { useState } from "react";
import {
  Drawer,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import User from "../../localStorages/User";
import { RiDashboardFill, RiLogoutBoxRFill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { IoPeople, IoDocuments } from "react-icons/io5";
import { FaBook, FaPeopleGroup } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const DrawerMobile = ({ open, closeDrawer }) => {
  const [openModal, setOpenModal] = useState(false);

  const itemSidebar = [
    {
      name: "Dashboard",
      icon: RiDashboardFill,
      path: "/dashboard",
    },
    {
      name: "Dosen",
      icon: IoPeople,
      path: "/dosen",
    },
    {
      name: "Mahasiswa",
      icon: FaPeopleGroup,
      path: "/mahasiswa",
    },
    {
      name: "Program Studi",
      icon: FaBook,
      path: "/prodi",
    },
    {
      name: "Skripsi",
      icon: IoDocuments,
      path: "/skripsi",
    },
  ];

  const handleOpen = () => setOpenModal(!openModal);
  const handleLogout = () => {
    User.Logout();
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <Drawer
        className="bg-black text-white rounded-r-xl flex flex-col justify-between"
        open={open}
        onClose={closeDrawer}
        transition={{ type: "tween", duration: 0.2 }}
      >
        <div>
          <div className="mb-2 flex items-center justify-between p-4">
            <div className="mb-2 p-4 flex flex-col gap-3">
              {/* <div className="flex">
                <img src={ski} alt="ski" className="w-10" />
                <div className="border-l-2"></div>
                <img src={lm} alt="lm" className="w-10" />
              </div> */}
              <div>
                <h1 className="text-white text-md font-bold tracking-widest">
                  SIM Skripsi
                </h1>
              </div>
            </div>
            <IconButton variant="text" color="white" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <List>
            {itemSidebar.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="sidebar text-sm rounded-lg text-white"
              >
                <ListItem className="hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200">
                  <ListItemPrefix>
                    <item.icon />
                  </ListItemPrefix>
                  <span className="font-bold text-sm">{item.name}</span>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
        <hr />
        <List>
          <NavLink
            to={"/profil"}
            className="sidebar rounded-lg text-sm text-white"
          >
            <ListItem className="hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200">
              <ListItemPrefix>
                <BsPersonCircle />
              </ListItemPrefix>
              <span className="font-bold text-sm tracking-wider ">Profil</span>
            </ListItem>
          </NavLink>
          <button onClick={handleOpen} className="text-sm text-white">
            <ListItem className="hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-200">
              <ListItemPrefix>
                <RiLogoutBoxRFill />
              </ListItemPrefix>
              <span className="font-bold text-sm tracking-wider ">Logout</span>
            </ListItem>
          </button>
        </List>
        <hr />
      </Drawer>
      <Dialog
        open={openModal}
        handler={handleOpen}
        size="xs"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody className="relative flex flex-col justify-center items-center gap-2">
          <div className="absolute top-10 left-10 bg-yellow-500 blur-3xl p-9 rounded-full"></div>
          <h1 className="text-xl lg:text-2xl font-bold text-main">
            Peringatan!
          </h1>
          {/* <img src="{warning}" className="w-32 lg:w-52" alt="warning logo" /> */}
          <p className="font-bold text-main text-lg">
            Apakah yakin ingin keluar?
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button onClick={handleLogout}>Oke</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DrawerMobile;
