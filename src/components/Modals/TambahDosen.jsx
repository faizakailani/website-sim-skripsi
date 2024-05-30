import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const TambahDosen = ({ isOpen, onClose }) => {
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
        <div className="flex flex-col gap-3 mt-2"></div>
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

export default TambahDosen;
