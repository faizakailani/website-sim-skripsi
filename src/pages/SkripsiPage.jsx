import React, { Component } from "react";
import Layout from "../components/LayoutComponent";
import TambahSkripsi from "../components/Modals/TambahSkripsi";
import EditSkripsi from "../components/Modals/EditSkripsi";
import { Button, Input } from "@material-tailwind/react";
import TableSkripsi from "../components/Tables/TableSkripsi";
import ReactPaginate from "react-paginate";
import AlertComponent from "../components/AlertComponent";
import SkripsiService from "../services/service/SkripsiService";

export default class SkripsiPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isModalEditOpen: false,
      page: 1,
      limit: 10,
      skripsi: [],
      allSkripsi: [],
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

  deleteData = (id) => {
    AlertComponent.DeleteConfirmation("Hapus Data Skripsi").then(async (e) => {
      if (e.isConfirmed) {
        try {
          SkripsiService.DeleteSkripsi(id).then((res) => {
            if (res.status === 200) {
              AlertComponent.SuccessResponse(res.data.message);
              setInterval(() => {
                window.location.reload();
              }, 1000);
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

  getSkripsi = () => {
    const kode = {
      orderBy: "DESC",
      sortBy: "nim",
      limit: 1000,
      include_inactive: false,
      page: 1,
    };
    this.setState({ isLoading: true });
    try {
      SkripsiService.GetSkripsi(kode).then((res) => {
        const allSkripsi = res.data.data;
        const pageCount = Math.ceil(allSkripsi.length / this.state.limit);
        this.setState({
          allSkripsi,
          skripsi: allSkripsi.slice(0, this.state.limit),
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
    const currentPageData = this.state.allSkripsi
      .filter((skripsi) =>
        skripsi.nim.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      )
      .slice(offset, offset + this.state.limit);
    this.setState({ page: selected + 1, skripsi: currentPageData });
  };

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    const filteredData = this.state.allSkripsi.filter((skripsi) =>
      skripsi.nim.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const pageCount = Math.ceil(filteredData.length / this.state.limit);
    this.setState({
      searchQuery,
      skripsi: filteredData.slice(0, this.state.limit),
      pageCount,
      page: 1,
    });
  };

  componentDidMount() {
    this.getSkripsi();
  }

  render() {
    return (
      <Layout>
        <div className="m-1 bg-bw p-5 rounded-md min-h-screen">
          <h1 className="text-navy font-bold tracking-widest">
            Manajemen Skripsi
          </h1>
          <div className="flex justify-end gap-2 my-3">
            <Input
              label="Cari berdasarkan nim"
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <Button
              className="bg-navy whitespace-nowrap w-1/4"
              onClick={() => this.openModal()}
            >
              Tambah Program Skripsi
            </Button>
          </div>
          <TableSkripsi
            data={this.state.skripsi}
            onDeleteItem={this.deleteData}
            onEditItem={this.openEditModal}
            currentPage={this.state.page}
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
          <TambahSkripsi
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
          />
        )}
        {this.state.isModalEditOpen && (
          <EditSkripsi
            items={this.state.items}
            isOpen={this.state.isModalEditOpen}
            onClose={() => this.closeEditModal()}
          />
        )}
      </Layout>
    );
  }
}
