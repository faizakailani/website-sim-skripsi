import { IconButton } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TableMahasiswa = ({ onDeleteItem, onEditItem, data = [], currentPage }) => {
  const handleDelete = (nim) => {
    onDeleteItem(nim);
  };

  const handleEdit = (items) => {
    onEditItem(items);
  };
  const TABLE_HEAD = ["No", "NIM", "Nama", "Program Studi", "Foto", "Aksi"];

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
          {data.map((item, index) => (
            <tr key={index} className="odd:bg-blue-gray-50">
              <td scope="row" className={`px-4 py-3`}>
                {(currentPage - 1) * 10 + index + 1}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.nim}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.nama}
              </td>
              <td scope="row" className={`px-4 py-3`}>
                {item.program_studi}
              </td>
              <td scope="row" className={`px-4 py-3`}>
              <Link to={item.foto}>{item.foto}</Link>
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
                  onClick={() => handleDelete(item.nim)}
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

export default TableMahasiswa;
