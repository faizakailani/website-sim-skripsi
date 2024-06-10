import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { GoNumber, GoPencil } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AlertComponent from "../AlertComponent";
import ProgramStudiService from "../../services/service/ProgramStudiService"; // Assuming this service is available

// eslint-disable-next-line react/prop-types
const EditProdi = ({ isOpen, onClose, items }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [kode, setKode] = useState("");
  const [program_studi, setProgramStudi] = useState("");
  const [kaprodi, setKaprodi] = useState("");
  const [nidn_kaprodi, setNidnKaprodi] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (kode === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukkan Kode");
      return;
    }
    if (program_studi === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukkan Program Studi");
      return;
    }
    if (kaprodi === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukkan Kaprodi");
      return;
    }
    if (nidn_kaprodi === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukkan NIDN Kaprodi");
      return;
    }
    let data = {
      kode,
      program_studi,
      kaprodi,
      nidn_kaprodi,
    };
    try {
      const response = await ProgramStudiService.updateProdi(data); // Assuming updateProdi function exists in ProgramStudiService
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
    if (items) {
      setKode(items.kode);
      setProgramStudi(items.program_studi);
      setKaprodi(items.kaprodi);
      setNidnKaprodi(items.nidn_kaprodi);
    }
  }, [items]);

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
          Edit Data Program Studi
        </h1>
        <p className="text-sm text-navy">
          Masukkan detail program studi untuk mengubah data
        </p>
        <div className="flex flex-col gap-3 mt-3">
          <Input
            type="text"
            label="Kode"
            icon={<GoPencil />}
            placeholder="ex. PS01"
            name="kode"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
          <Input
            type="text"
            label="Program Studi"
            icon={<GoPencil />}
            placeholder="ex. Teknik Informatika"
            name="program_studi"
            value={program_studi}
            onChange={(e) => setProgramStudi(e.target.value)}
          />
          <Input
            type="text"
            label="Kaprodi"
            icon={<BsPerson />}
            placeholder="ex. John Doe"
            name="kaprodi"
            value={kaprodi}
            onChange={(e) => setKaprodi(e.target.value)}
          />
          <Input
            type="text"
            label="NIDN Kaprodi"
            icon={<GoNumber />}
            placeholder="ex. 040402762.."
            name="nidn_kaprodi"
            value={nidn_kaprodi}
            onChange={(e) => setNidnKaprodi(e.target.value)}
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

export default EditProdi;
