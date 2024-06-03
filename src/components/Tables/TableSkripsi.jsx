import { IconButton } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const TableSkripsi = ({ onDeleteItem, onEditItem }) => {
  const handleDelete = () => {
    onDeleteItem();
  };

  const handleEdit = () => {
    onEditItem();
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
              <th
                key={index}
                scope="col"
                className={`px-4 py-3 whitespace-nowrap`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-blue-gray-50">
            <td scope="row" className={`px-4 py-3`}>
              1
            </td>
            <td scope="row" className={`px-4 py-3`}>
              0002047701
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Teguh Wiharko, S.T., M.T.
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Gunawansyah
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Rini
            </td>
            <td scope="row" className={`px-4 py-3`}>
              03/06/2024
            </td>
            <td scope="row" className={`px-4 py-3`}>
              20/06/2024
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Aula Utama
            </td>
            <td scope="row" className={`px-4 py-3`}>
              A
            </td>
            <td scope="row" className={`px-4 py-3`}>
              B
            </td>
            <td scope="row" className={`px-4 py-3`}>
              A
            </td>
            <td scope="row" className={`px-4 py-3`}>
              A
            </td>
            <td scope="row" className={`px-4 py-3`}>
              -
            </td>
            <td scope="row" className="flex gap-2 px-4 py-3">
              <IconButton size="sm" className="bg-navy" onClick={handleEdit}>
                <FiEdit />
              </IconButton>
              <IconButton size="sm" className="bg-red" onClick={handleDelete}>
                <MdDelete />
              </IconButton>
            </td>
          </tr>
          <tr className="odd:bg-blue-gray-50">
            <td scope="row" className={`px-4 py-3`}>
              1
            </td>
            <td scope="row" className={`px-4 py-3`}>
              0002047701
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Teguh Wiharko, S.T., M.T.
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Gunawansyah
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Rini
            </td>
            <td scope="row" className={`px-4 py-3`}>
              03/06/2024
            </td>
            <td scope="row" className={`px-4 py-3`}>
              20/06/2024
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Aula Utama
            </td>
            <td scope="row" className={`px-4 py-3`}>
              A
            </td>
            <td scope="row" className={`px-4 py-3`}>
              B
            </td>
            <td scope="row" className={`px-4 py-3`}>
              A
            </td>
            <td scope="row" className={`px-4 py-3`}>
              A
            </td>
            <td scope="row" className={`px-4 py-3`}>
              -
            </td>
            <td scope="row" className="flex gap-2 px-4 py-3">
              <IconButton size="sm" className="bg-navy" onClick={handleEdit}>
                <FiEdit />
              </IconButton>
              <IconButton size="sm" className="bg-red" onClick={handleDelete}>
                <MdDelete />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableSkripsi;
