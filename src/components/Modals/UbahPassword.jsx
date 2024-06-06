import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AlertComponent from "../AlertComponent";
import UserService from "../../services/service/UserService";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const UbahPassword = ({ isOpen, onClose, data }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleShowConfirmPassword = async () => {
    setshowConfirmPassword(!showConfirmPassword);
  };

  const handleShowNewPassword = async () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (confirmPassword === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan konfirmasi password baru");
      return;
    }
    if (newPassword === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan password baru");
      return;
    }
    let data = {
      password: newPassword,
      passwordVerify: confirmPassword,
    };
    try {
      const response = await UserService.UpdatePassword(data);
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
          className="cursor-pointer w-7 h-7 float-end text-black"
          onClick={handleClose}
        />
        <h1 className="text-black font-bold text-xl tracking-wider mb-2">
          Ubah Password
        </h1>
        <div className="flex flex-col gap-3">
          <Input
            label="Password Baru"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password Baru"
            icon={
              showNewPassword ? (
                <AiFillEye
                  className="cursor-pointer"
                  onClick={handleShowNewPassword}
                />
              ) : (
                <AiFillEyeInvisible
                  className="cursor-pointer"
                  onClick={handleShowNewPassword}
                />
              )
            }
          />
          <Input
            label="Konfirmasi Password Baru"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password Baru"
            icon={
              showConfirmPassword ? (
                <AiFillEye
                  className="cursor-pointer"
                  onClick={handleShowConfirmPassword}
                />
              ) : (
                <AiFillEyeInvisible
                  className="cursor-pointer"
                  onClick={handleShowConfirmPassword}
                />
              )
            }
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="bg-black w-full rounded-full"
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

export default UbahPassword;
