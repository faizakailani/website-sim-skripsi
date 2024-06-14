import { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import DosenService from "../../services/service/DosenService";

// Utility function to format date
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// eslint-disable-next-line react/prop-types
const TableSkripsi = ({ onDeleteItem, onEditItem, data = [], currentPage }) => {
  const [dosens, setDosens] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = {
        orderBy: "DESC",
        sortBy: "nama",
        limit: 1000,
        include_inactive: false,
        page: 1,
      };
      const response = await DosenService.GetDosen(data);
      setDosens(response.data.data);
    } catch (error) {
      console.error("Error fetching dosens:", error);
    }
  };

  const findDosenNameByNidn = (nidn) => {
    const dosen = dosens.find((dosen) => dosen.nidn === nidn);
    return dosen ? dosen.nama : "";
  };

  const handleDelete = (id) => {
    onDeleteItem(id);
  };

  const handleEdit = (items) => {
    onEditItem(items);
  };

  const TABLE_HEAD = [
    "No",
    "NIM",
    "Pembimbing",
    "Penguji 1",
    "Penguji 2",
    "Tanggal Daftar",
    "Tanggal Sidang",
    "Ruang Sidang",
    "Nilai Pembimbing",
    "Nilai Penguji 1",
    "Nilai Penguji 2",
    "Nilai Akhir",
    "Keterangan",
    "Aksi",
  ];

  return (
    <div className="bg-white rounded-lg h-96 lg:h-fit overflow-auto my-5">
      <table className="min-w-full text-xs text-left text-blue">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={index} scope="col" className={`px-4 py-3 whitespace-nowrap`}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="odd:bg-blue-gray-50">
              <td scope="row" className={`px-4 py-3`}>
                {(currentPage - 1) * 10 + index + 1}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.nim}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {findDosenNameByNidn(item.pembimbing)}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {findDosenNameByNidn(item.penguji1)}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {findDosenNameByNidn(item.penguji2)}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {formatDate(item.tanggal_daftar)}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {formatDate(item.tanggal_sidang)}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.ruang_sidang}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.nilai_pembimbing}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.nilai_penguji1}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.nilai_penguji2}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.nilai_akhir}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.keterangan}
              </td>
              <td scope="row" className="flex gap-2 px-4 py-3">
                <IconButton
                  size="sm"
                  className="bg-navy"
                  onClick={() => handleEdit(item)}
                >
                  <FiEdit />
                </IconButton>
                <IconButton
                  size="sm"
                  className="bg-red"
                  onClick={() => handleDelete(item.id)}
                >
                  <MdDelete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkripsi;
