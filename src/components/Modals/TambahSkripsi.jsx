import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { BiInfoSquare } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdRoomPreferences, MdScore } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const TambahSkripsi = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    onClose();
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
      <DialogBody className="h-[25rem] overflow-y-scroll">
        <IoIosCloseCircleOutline
          className="cursor-pointer w-7 h-7 float-end text-navy"
          onClick={handleClose}
        />
        <h1 className="text-navy font-bold text-xl tracking-wider mb-2">
          Tambahkan Data Skripsi
        </h1>
        <p className=" text-sm text-navy">
          Masukan detail skripsi untuk menambahkan data
        </p>
        <div className="flex flex-col gap-3 mt-3">
          <Input type="text" label="NIM" icon={<GoNumber />} />
          <Input type="text" label="Pembimbing" icon={<BsPerson />} />
          <Input type="text" label="Penguji 1" icon={<BsPerson />} />
          <Input type="text" label="Penguji 2" icon={<BsPerson />} />
          <Input type="date" label="Tanggal Daftar" />
          <Input type="date" label="Tanggal Sidang" />
          <Input
            type="text"
            label="Ruang Sidang"
            icon={<MdRoomPreferences />}
          />
          <Input type="text" label="Nilai Pembimbing" icon={<MdScore />} />
          <Input type="text" label="Nilai Penguji 1" icon={<MdScore />} />
          <Input type="text" label="Nilai Penguji 2" icon={<MdScore />} />
          <Input type="text" label="Nilai Akhir" icon={<MdScore />} />
          <Input type="text" label="Keterangan" icon={<BiInfoSquare />} />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="bg-navy w-full "
          variant="gradient"
          // onClick={handleSave}
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

export default TambahSkripsi;
