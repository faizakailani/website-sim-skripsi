import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaMapSigns } from "react-icons/fa";
import { MdContactPhone, MdEmail } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import AlertComponent from "../AlertComponent";
import UserService from "../../services/service/UserService";

// eslint-disable-next-line react/prop-types
const EditProfile = ({ isOpen, onClose, data = {} }) => {
  const [username, setUsername] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (username === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan username");
      return;
    }

    if (email === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan email");
      return;
    }

    if (telp === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan telepon");
      return;
    }

    if (alamat === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan alamat");
      return;
    }

    let data = {
      username,
      email,
      telp,
      alamat,
    };

    try {
      const response = await UserService.UpdateProfile(data);
      setIsLoading(false);
      onClose();
      AlertComponent.SuccessResponse(response.data.message);
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      onClose();
      AlertComponent.Error(error.response.data.message);
    }
  };

  useEffect(() => {
    setUsername(data.username);
    setTelp(data.telp);
    setAlamat(data.alamat);
    setEmail(data.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={isOpen}
      size="sm"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody>
        <IoIosCloseCircleOutline
          className="cursor-pointer w-7 h-7 float-end text-black"
          onClick={handleClose}
        />
        <h1 className="text-black font-bold text-xl tracking-wider mb-2">
          Edit Data
        </h1>
        <p className=" text-sm text-black">Ubah detail pengguna</p>
        <div className="flex flex-col gap-3 mt-3">
          <Input
            label="Username"
            type="text"
            icon={<BsPersonFill />}
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Email"
            type="text"
            icon={<MdEmail />}
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Alamat"
            type="text"
            icon={<FaMapSigns />}
            value={alamat}
            name="alamat"
            onChange={(e) => setAlamat(e.target.value)}
          />
          <Input
            label="Telepon"
            type="text"
            icon={<MdContactPhone />}
            value={telp}
            name="telp"
            onChange={(e) => setTelp(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="bg-navy w-full"
          variant="gradient"
          onClick={handleSave}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            "Simpan"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditProfile;
