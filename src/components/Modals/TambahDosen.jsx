import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import { ImImage } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AlertComponent from "../AlertComponent";
import DosenService from "../../services/service/DosenService";

// eslint-disable-next-line react/prop-types
const TambahDosen = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nidn, setNidn] = useState("");
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState("");
  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (foto === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan foto");
      return;
    }
    if (nidn === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan NIDN");
      return;
    }
    if (nama === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan nama");
      return;
    }
    let data = {
      foto,
      nidn,
      nama,
    };
    try {
      const response = await DosenService.AddDosen(data);
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
          className="cursor-pointer w-7 h-7 float-end text-navy"
          onClick={handleClose}
        />
        <h1 className="text-navy font-bold text-xl tracking-wider mb-2">
          Tambahkan Data Dosen
        </h1>
        <p className=" text-sm text-navy">
          Masukan detail dosen untuk menambahkan data
        </p>
        <div className="flex flex-col gap-3 mt-3">
          <Input
            type="text"
            label="NIDN"
            icon={<GoNumber />}
            placeholder="ex. DS-001"
            name="nidn"
            value={nidn}
            onChange={(e) => setNidn(e.target.value)}
          />
          <Input
            type="text"
            label="Nama"
            icon={<BsPerson />}
            placeholder="ex. Jhon Doe"
            name="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <Input
            type="text"
            label="Foto"
            icon={<ImImage />}
            placeholder="https://images"
            name="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="bg-navy w-full "
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

export default TambahDosen;
