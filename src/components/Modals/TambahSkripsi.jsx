import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiInfoSquare } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdRoomPreferences, MdScore } from "react-icons/md";
import AlertComponent from "../AlertComponent";
import SkripsiService from "../../services/service/SkripsiService";
import DosenService from "../../services/service/DosenService";
import MahasiswaService from "../../services/service/MahasiswaService";

const TambahSkripsi = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nim, setNim] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [penguji1, setPenguji1] = useState("");
  const [penguji2, setPenguji2] = useState("");
  const [tanggal_daftar, setTanggalDaftar] = useState("");
  const [tanggal_sidang, setTanggalSidang] = useState("");
  const [ruang_sidang, setRuangSidang] = useState("");
  const [nilai_pembimbing, setNilaiPembimbing] = useState("");
  const [nilai_penguji1, setNilaiPenguji1] = useState("");
  const [nilai_penguji2, setNilaiPenguji2] = useState("");
  const [nilai_akhir, setNilaiAkhir] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [dosens, setDosens] = useState([]);
  const [mahasiswas, setMahasiswas] = useState([]);
  const [isLoadingMahasiswa, setIsLoadingMahasiswa] = useState(false);
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    getDosen();
    getMahasiswa();
  }, []);

  const generateUniqueId = () => {
    const min = 100000;
    const max = 999999;
    const uniqueId = Math.floor(min + Math.random() * (max - min + 1));
    return uniqueId;
  };

  const getDosen = async () => {
    setIsLoading(true);
    try {
      const data = {
        orderBy: "DESC",
        sortBy: "nama",
        limit: 1000,
        include_inactive: false,
        page: 1,
      };
      const response = await DosenService.GetDosen(data);
      const allDosens = response.data.data;
      setDosens(allDosens);
    } catch (error) {
      console.error("Error fetching dosens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMahasiswa = async () => {
    setIsLoadingMahasiswa(true);
    try {
      const data = {
        orderBy: "DESC",
        sortBy: "nama",
        limit: 1000,
        include_inactive: false,
        page: 1,
      };
      const response = await MahasiswaService.GetMahasiswa(data);
      const allMahasiswas = response.data.data;
      setMahasiswas(allMahasiswas);
    } catch (error) {
      console.error("Error fetching mahasiswas:", error);
    } finally {
      setIsLoadingMahasiswa(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const uniqueId = generateUniqueId();
    // Validasi
    if (nim === "") {
      onClose();
      AlertComponent.Error("Silakan masukkan foto");
      return;
    }
    if (pembimbing === "") {
      onClose();
      AlertComponent.Error("Silahkan Pilih Pembimbing");
      return;
    }
    if (penguji1 === "") {
      onClose();
      AlertComponent.Error("Silahkan Pilih Penguji 1");
      return;
    }
    if (penguji2 === "") {
      onClose();
      AlertComponent.Error("Silahkan Pilih Penguji 2");
      return;
    }
    if (tanggal_daftar === "") {
      onClose();
      AlertComponent.Error("Silahkan Pilih Tanggal Daftar");
      return;
    }
    if (tanggal_sidang === "") {
      onClose();
      AlertComponent.Error("Silahkan Pilih Tanggal Sidang");
      return;
    }
    if (ruang_sidang === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Ruang Sidang");
      return;
    }
    if (nilai_pembimbing === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Nilai Pembimbing");
      return;
    }
    if (nilai_penguji1 === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Nilai Penguji 1");
      return;
    }
    if (nilai_penguji2 === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Nilai Penguji 2");
      return;
    }
    if (nilai_akhir === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Nilai Akhir");
      return;
    }
    if (keterangan === "") {
      onClose();
      AlertComponent.Error("Silahkan Masukan Keterangan");
      return;
    }
    let data = {
      id: uniqueId,
      nim,
      pembimbing,
      penguji1,
      penguji2,
      tanggal_daftar,
      tanggal_sidang,
      ruang_sidang,
      nilai_pembimbing,
      nilai_penguji1,
      nilai_penguji2,
      nilai_akhir,
      keterangan,
    };
    try {
      const response = await SkripsiService.AddSkripsi(data);
      setIsLoading(false);
      onClose();
      AlertComponent.SuccessResponse(response.data.message);
      setInterval(() => {
        window.location.reload();
      }, 1000);
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
          <select
            className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            name="nim"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
          >
            <option value="">Pilih NIM Mahasiswa</option>
            {mahasiswas.map((mahasiswa) => (
              <option key={mahasiswa.nim} value={mahasiswa.nim}>
                {mahasiswa.nama} - ({mahasiswa.nim})
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <select
              className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              name="pembimbing"
              value={pembimbing}
              onChange={(e) => setPembimbing(e.target.value)}
            >
              <option value="">Pilih Pembimbing</option>
              {dosens.map((dosen) => (
                <option key={dosen.nidn} value={dosen.nidn}>
                  {dosen.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <select
              className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              name="penguji1"
              value={penguji1}
              onChange={(e) => setPenguji1(e.target.value)}
            >
              <option value="">Pilih Penguji 1</option>
              {dosens.map((dosen) => (
                <option key={dosen.nidn} value={dosen.nidn}>

                  {dosen.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <select
              className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              name="penguji2"
              value={penguji2}
              onChange={(e) => setPenguji2(e.target.value)}
            >
              <option value="">Pilih Penguji 2</option>
              {dosens.map((dosen) => (
                <option key={dosen.nidn} value={dosen.nidn}>
                  {dosen.nama}
                </option>
              ))}
            </select>
          </div>
          <Input
            type="date"
            name="tanggal_daftar"
            label="Tanggal Daftar"
            value={tanggal_daftar}
            onChange={(e) => setTanggalDaftar(e.target.value)}
          />
          <Input
            type="date"
            name="tanggal_sidang"
            label="Tanggal Sidang"
            value={tanggal_sidang}
            onChange={(e) => setTanggalSidang(e.target.value)}
          />
          <Input
            type="text"
            name="ruang_sidang"
            label="Ruang Sidang"
            icon={<MdRoomPreferences />}
            value={ruang_sidang}
            onChange={(e) => setRuangSidang(e.target.value)}
          />
          <Input
            type="text"
            name="nilai_pembimbing"
            label="Nilai Pembimbing"
            icon={<MdScore />}
            value={nilai_pembimbing}
            onChange={(e) => setNilaiPembimbing(e.target.value)}
          />
          <Input
            type="text"
            name="nilai_penguji1"
            label="Nilai Penguji 1"
            icon={<MdScore />}
            value={nilai_penguji1}
            onChange={(e) => setNilaiPenguji1(e.target.value)}
          />
          <Input
            type="text"
            name="nilai_penguji2"
            label="Nilai Penguji 2"
            icon={<MdScore />}
            value={nilai_penguji2}
            onChange={(e) => setNilaiPenguji2(e.target.value)}
          />
          <Input
            type="text"
            name="nilai_akhir"
            label="Nilai Akhir"
            icon={<MdScore />}
            value={nilai_akhir}
            onChange={(e) => setNilaiAkhir(e.target.value)}
          />
          <Input
            type="text"
            name="keterangan"
            label="Keterangan"
            icon={<BiInfoSquare />}
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="bg-navy w-full "
          variant="gradient"
          onClick={handleSave}
          fullWidth
          disabled={isLoading || isLoadingMahasiswa}
        >
          {isLoading || isLoadingMahasiswa ? (
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
