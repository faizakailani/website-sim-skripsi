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
import { BsMortarboard } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import { ImImage } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AlertComponent from "../AlertComponent";
import MahasiswaService from "../../services/service/MahasiswaService";

// eslint-disable-next-line react/prop-types
const TambahMahasiswa = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [program_studi, setProdi] = useState("")
  const [Foto, setFoto] = useState("");
  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (Foto === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Foto");
      return;
    }
    if (nim === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan NIM");
      return;
    }
    if (nama === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Nama");
      return;
    }
    let data = {
      Foto,
      program_studi, 
      nim, 
      nama,
    };
    try {
      const response = await MahasiswaService.AddMahasiswa(data);
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
          Tambahkan Data Mahasiswa
        </h1>
        <p className=" text-sm text-navy">
          Masukan detail Mahasiswa untuk menambahkan data
        </p>
        <div className="flex flex-col gap-3 mt-3">
          <Input 
            type="text" 
            label="NIM"
            icon={<GoNumber />}
            placeholder="ex. 2221109222" 
            name="nim"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
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
            label="Program Studi" 
            icon={<BsMortarboard />}
            placeholder="ex. Teknik Informatika"
            name="prodi"
            value={program_studi}
            onChange={(e) => setProdi(e.target.value)}
          />
          <Input 
            type="text" 
            label="Foto" 
            icon={<ImImage />} 
            placeholder="https://images"
            name="Foto"
            value={Foto}
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

export default TambahMahasiswa;
