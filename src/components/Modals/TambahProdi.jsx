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
  import { GoNumber, GoPencil } from "react-icons/go";
  import { IoIosCloseCircleOutline } from "react-icons/io";
  
  // eslint-disable-next-line react/prop-types
  const TambahProdi = ({ isOpen, onClose }) => {
    const [isLoading] = useState(false);
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
            Tambahkan Data Program Studi
          </h1>
          <p className=" text-sm text-navy">
            Masukan detail program studi untuk menambahkan data
          </p>
          <div className="flex flex-col gap-3 mt-3">
            <Input type="text" label="Kode" icon={<GoPencil />}/>
            <Input type="text" label="Program Studi" icon={<GoPencil />}/>
            <Input type="text" label="Kaprodi" icon={<BsPerson />}/>
            <Input type="text" label="NIDN Kaprodi" icon={<GoNumber />}/>
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
  
  export default TambahProdi;
  