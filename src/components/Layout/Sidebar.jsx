import { useState } from "react";
import {
  Button,
  Card,
  List,
  ListItem,
  Dialog,
  DialogBody,
  DialogFooter,
  ListItemPrefix,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { RiDashboardFill, RiLogoutBoxRFill } from "react-icons/ri";
import User from "../../localStorages/User";
import { IMAGES } from "../../assets";
import { IoDocuments, IoPeople } from "react-icons/io5";
import { FaBook, FaPeopleGroup } from "react-icons/fa6";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => setOpen(!open);
  const handleLogout = () => {
    User.Logout();
    setInterval(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Card className="bg-deep-blue hidden lg:flex flex-col justify-between w-64 p-2 border shadow-xl bg-navy text-bw m-1 rounded-md">
        <div className="overflow-y-auto overflow-x-hidden">
          <NavLink to={"/dashboard"}>
            <div className="text-xl font-extrabold tracking-widest mb-3 w-full mx-5">
              SIM SKRIPSI
            </div>
          </NavLink>
          <List className="text-sm">
            {itemSidebar.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="sidebar rounded-lg text-bw"
              >
                <ListItem className="hover:bg-bw active:bg-bw focus:bg-bw">
                  <ListItemPrefix>
                    <item.icon />
                  </ListItemPrefix>
                  <span className="font-bold text-sm">{item.name}</span>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
        <div>
          <List>
            <Button
              onClick={handleOpen}
              className="flex justify-center items-center gap-1 bg-bw text-navy"
            >
              <RiLogoutBoxRFill /> <span>Logout</span>
            </Button>
          </List>
        </div>
      </Card>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody className="relative flex flex-col justify-center items-center gap-2">
          <img
            src={IMAGES.pattern4}
            alt="pattern"
            className="absolute -top-3 right-6 w-6 lg:-top-4 lg:right-10 lg:w-10"
          />
          <div className="absolute top-10 left-10 bg-yellow-500 blur-3xl p-9 rounded-full"></div>
          <h1 className="text-xl lg:text-2xl font-bold text-main">
            Peringatan!
          </h1>
          <img
            src={IMAGES.warning}
            className="w-32 lg:w-52"
            alt="warning logo"
          />
          <p className="font-bold text-main text-lg">
            Anda yakin ingin keluar?
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
          <Button onClick={handleLogout} className="bg-navy">
            Oke
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Sidebar;
