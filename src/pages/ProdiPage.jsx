import { Component } from 'react'
import Layout from '../components/LayoutComponent'
import { Button, Input } from '@material-tailwind/react';
import TableProdi from '../components/Tables/TableProdi'
import AlertComponent from '../components/AlertComponent';
import ReactPaginate from 'react-paginate';
import TambahProdi from '../components/Modals/TambahProdi';
import EditProdi from '../components/Modals/EditProdi';

export default class ProdiPage extends Component {
  constructor () {
    super();
    this.state = {
      isModalOpen: false,
      isModalEditOpen: false,
      pageCount: 1
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true});
  };
  
  closeModal = () => {
    this.setState({ isModalOpen: false});
  };
  
  openEditModal = () => {
    this.setState({ isModalEditOpen: true});
  };
  
  closeEditModal = () => {
    this.setState({ isModalEditOpen: false});
  };
  deleteData() {
    AlertComponent.DeleteConfirmation("Hapus Data Dosen").then(async (e) => {
      if (e.isConfirmed) {
        try {
          AlertComponent.SuccessResponse("Sukses");
        } catch (error) {
          AlertComponent.showError("Error", error);
        }
      }
    });
  }
  render() {
    return (
      <Layout>
        <div className="m-1 bg-bw p-5 rounded-md">
          <h1 className="text-navy font-bold tracking-widest">
            Program Studi
          </h1>
          <div className="flex justify-end gap-2 my-3">
            <Input label="Cari berdasarkan nama"/>
            <Button className="bg-navy whitespace-nowrap w-1/4" onClick={() => this.openModal()}>
              Tambah Program Studi
            </Button>
          </div>
          <TableProdi
            onDeleteItem={() => this.deleteData()}
            onEditItem={() => this.openEditModal()}
          />
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            onPageChange={this.handlePageClick}
          />
        </div>
        {this.state.isModalOpen && (
          <TambahProdi
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
          />
        )}
        {this.state.isModalEditOpen && (
          <EditProdi
            isOpen={this.state.isModalEditOpen}
            onClose={() => this.closeEditModal()}
          />
        )}
      </Layout>
    )
  }
}

