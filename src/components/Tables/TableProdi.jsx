import { IconButton } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const TableProdi = ({ onDeleteItem, onEditItem }) => {
  const handleDelete = () => {
    onDeleteItem();
  };

  const handleEdit = () => {
    onEditItem();
  };
  const TABLE_HEAD = ["No", "Kode", "Program Studi", "Kaprodi", "NIDN Kaprodi", "Aksi"];
  return (
    <div className="bg-white rounded-lg h-96 lg:h-fit overflow-auto my-5">
      <table className="min-w-full text-sm text-left text-blue">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={index} scope="col" className={`px-4 py-3`}>
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
              PS01
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Teknik Informatika
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Gunawan, S.T., M.Kom.
            </td>
            <td scope="row" className={`px-4 py-3`}>
                0404027604
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
              2
            </td>
            <td scope="row" className={`px-4 py-3`}>
              PS02
            </td>
            <td scope="row" className={`px-4 py-3`}>
              Sistem Infomrasi
            </td>
            <td scope="row" className={`px-4 py-3`}>
             Abdul Manaf, Phd.	
            </td>
            <td scope="row" className={`px-4 py-3`}>
                002
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

export default TableProdi;
