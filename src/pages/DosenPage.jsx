import React, { Component } from "react";
import Layout from "../components/LayoutComponent";
import { Button, Input } from "@material-tailwind/react";
import TambahDosen from "../components/Modals/TambahDosen";
import TableDosen from "../components/Tables/TableDosen";
import EditDosen from "../components/Modals/EditDosen";
import AlertComponent from "../components/AlertComponent";
import ReactPaginate from "react-paginate";
import DosenService from "../services/service/DosenService";

export default class DosenPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isModalEditOpen: false,
      page: 1,
      limit: 10,
      dosens: [],
      allDosens: [],
      pageCount: 0,
      searchQuery: "",
      isLoading: false,
      items: null,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openEditModal = (items) => {
    this.setState({ isModalEditOpen: true, items });
  };

  closeEditModal = () => {
    this.setState({ isModalEditOpen: false });
  };

  deleteData = (nidn) => {
    AlertComponent.DeleteConfirmation("Hapus Data Dosen").then(async (e) => {
      if (e.isConfirmed) {
        try {
          DosenService.DeleteDosen(nidn).then((res) => {
            if (res.status === 200) {
              AlertComponent.SuccessResponse(res.data.message);
              setInterval(() => {
                window.location.reload();
              }, 2000);
            } else {
              AlertComponent.Error(res.data.message);
            }
          });
        } catch (error) {
          AlertComponent.showError("Error", error);
        }
      }
    });
  };

  getDosen = () => {
    const data = {
      orderBy: "DESC",
      sortBy: "nama",
      limit: 1000, // Set a high limit to get all data
      include_inactive: false,
      page: 1,
    };
    this.setState({ isLoading: true });
    try {
      DosenService.GetDosen(data).then((res) => {
        const allDosens = res.data.data;
        const pageCount = Math.ceil(allDosens.length / this.state.limit);
        this.setState({
          allDosens,
          dosens: allDosens.slice(0, this.state.limit),
          pageCount,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlePageClick = (data) => {
    let selected = data.selected;
    const offset = selected * this.state.limit;
    const currentPageData = this.state.allDosens
      .filter((dosen) =>
        dosen.nama.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      )
      .slice(offset, offset + this.state.limit);
    this.setState({ page: selected + 1, dosens: currentPageData });
  };

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    const filteredData = this.state.allDosens.filter((dosen) =>
      dosen.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const pageCount = Math.ceil(filteredData.length / this.state.limit);
    this.setState({
      searchQuery,
      dosens: filteredData.slice(0, this.state.limit),
      pageCount,
      page: 1,
    });
  };

  componentDidMount() {
    this.getDosen();
  }

  render() {
    return (
      <Layout>
        <div className="m-1 bg-bw p-5 rounded-md min-h-screen">
          <h1 className="text-navy font-bold tracking-widest">
            Manajemen Dosen
          </h1>
          <div className="flex justify-end gap-2 my-3">
            <Input
              label="Cari berdasarkan nama"
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <Button
              className="bg-navy whitespace-nowrap w-1/4"
              onClick={() => this.openModal()}
            >
              Tambah Dosen
            </Button>
          </div>
          {this.state.isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <TableDosen
              data={this.state.dosens}
              onDeleteItem={this.deleteData}
              onEditItem={this.openEditModal}
              currentPage={this.state.page}
            />
          )}
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
          <TambahDosen
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
          />
        )}
        {this.state.isModalEditOpen && (
          <EditDosen
            items={this.state.items}
            isOpen={this.state.isModalEditOpen}
            onClose={() => this.closeEditModal()}
          />
        )}
      </Layout>
    );
  }
}
