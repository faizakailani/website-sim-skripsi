import React, { Component } from "react";
import Layout from "../components/LayoutComponent";
import { Button } from "@material-tailwind/react";
import TambahDosen from "../components/Modals/TambahDosen";
import TableDosen from "../components/Tables/TableDosen";
import EditDosen from "../components/Modals/EditDosen";
import AlertComponent from "../components/AlertComponent";

export default class DosenPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isModalEditOpen: false,
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
            Manajemen Dosen
          </h1>
          <div className="flex justify-end">
            <Button className="bg-navy" onClick={() => this.openModal()}>
              Tambah Dosen
            </Button>
          </div>
          <TableDosen
            onDeleteItem={() => this.deleteData()}
            onEditItem={() => this.openEditModal()}
          />
        </div>
        {this.state.isModalOpen && (
          <TambahDosen
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
          />
        )}
        {this.state.isModalEditOpen && (
          <EditDosen
            isOpen={this.state.isModalEditOpen}
            onClose={() => this.closeEditModal()}
          />
        )}
      </Layout>
    );
  }
}
