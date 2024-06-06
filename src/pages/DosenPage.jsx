import React, { Component } from "react";
import Layout from "../components/LayoutComponent";
import { Button, Input } from "@material-tailwind/react";
import TambahDosen from "../components/Modals/TambahDosen";
import TableDosen from "../components/Tables/TableDosen";
import EditDosen from "../components/Modals/EditDosen";
import AlertComponent from "../components/AlertComponent";
// import ReactPaginate from "react-paginate";
import DosenService from "../services/service/DosenService";

export default class DosenPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isModalEditOpen: false,
      page: 1,
      limit: 1000,
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

  getDosen = (page, limit) => {
    const data = {
      orderBy: "DESC",
      sortBy: "nama",
      limit,
      include_inactive: false,
      page,
    };
    try {
      this.setState({ isLoading: true });
      DosenService.GetDosen(data).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.getDosen(this.state.page, this.state.limit);
  }

  render() {
    return (
      <Layout>
        <div className="m-1 bg-bw p-5 rounded-md min-h-screen">
          <h1 className="text-navy font-bold tracking-widest">
            Manajemen Dosen
          </h1>
          <div className="flex justify-end gap-2 my-3">
            <Input label="Cari berdasarkan nama" />
            <Button
              className="bg-navy whitespace-nowrap w-1/4"
              onClick={() => this.openModal()}
            >
              Tambah Dosen
            </Button>
          </div>
          <TableDosen
            onDeleteItem={() => this.deleteData()}
            onEditItem={() => this.openEditModal()}
          />
          {/* <ReactPaginate
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
          /> */}
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
