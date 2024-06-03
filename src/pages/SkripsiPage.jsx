import React, { Component } from "react";
import Layout from "../components/LayoutComponent";
import TambahSkripsi from "../components/Modals/TambahSkripsi";
import EditSkripsi from "../components/Modals/EditSkripsi";
import { Button, Input } from "@material-tailwind/react";
import TableSkripsi from "../components/Tables/TableSkripsi";
import ReactPaginate from "react-paginate";
import AlertComponent from "../components/AlertComponent";

export default class SkripsiPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isModalEditOpen: false,
      pageCount: 1,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openEditModal = () => {
    this.setState({ isModalEditOpen: true });
  };

  closeEditModal = () => {
    this.setState({ isModalEditOpen: false });
  };

  deleteData() {
    AlertComponent.DeleteConfirmation("Hapus Data Skripsi").then(async (e) => {
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
        <div className="m-1 bg-bw p-5 rounded-md min-h-screen">
          <h1 className="text-navy font-bold tracking-widest">
            Manajemen Skripsi
          </h1>
          <div className="flex justify-end gap-2 my-3">
            <Input label="Cari berdasarkan nim" />
            <Button
              className="bg-navy whitespace-nowrap w-1/4"
              onClick={() => this.openModal()}
            >
              Tambah Skripsi
            </Button>
          </div>
          <TableSkripsi
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
            // onPageChange={this.handlePageClick}
          />
        </div>
        {this.state.isModalOpen && (
          <TambahSkripsi
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
          />
        )}
        {this.state.isModalEditOpen && (
          <EditSkripsi
            isOpen={this.state.isModalEditOpen}
            onClose={() => this.closeEditModal()}
          />
        )}
      </Layout>
    );
  }
}
