import { Component } from "react";
import Layout from "../components/LayoutComponent";
import { Button, Input, Spinner } from "@material-tailwind/react";
import TableProdi from "../components/Tables/TableProdi";
import AlertComponent from "../components/AlertComponent";
import ReactPaginate from "react-paginate";
import TambahProdi from "../components/Modals/TambahProdi";
import EditProdi from "../components/Modals/EditProdi";
<<<<<<< Updated upstream
=======
import ProgramStudiService from "../services/service/ProgramStudiService";
import TableDosen from "../components/Tables/TableDosen";
>>>>>>> Stashed changes

export default class ProdiPage extends Component {
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
    AlertComponent.DeleteConfirmation("Hapus Data Dosen").then(async (e) => {
      if (e.isConfirmed) {
        try {
          AlertComponent.SuccessResponse("Sukses");
        } catch (error) {
          AlertComponent.showError("Error", error);
        }
      }
    });
<<<<<<< Updated upstream
=======
  };

  getProdi = () => {
    const kode = {
      orderBy: "DESC",
      sortBy: "nama",
      limit: 1000,
      include_inactive: false,
      page: 1,
    };
    this.setState({ isLoading: true });
    try{
      ProgramStudiService.GetProdi(kode).then((res) => {
        const allProdis = res.data.kode;
        const pageCount = Math.ceil(allProdis.length / this.state.limit);
        this.setState({
          allProdis,
          prodis: allProdis.slice(0, this.state.limit),
          pageCount,
        });
      });
    } catch (error){
      console.log(error);
    } finally {
      this.setState({ isLoading: false});
    }
  };

  handlePageClick = (data) => {
    let selected = data.selected;
    const offset = selected * this.state.limit;
    const currentPageData = this.state.allProdis
      .filter((prodi) =>
        prodi.nama.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      )
      .slice(offset, offset + this.state.limit);
    this.setState({ page: selected + 1, prodis: currentPageData });
  };

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    const filteredData = this.state.allProdis.filter((prodi) =>
      prodi.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const pageCount = Math.ceil(filteredData.length / this.state.limit);
    this.setState({
      searchQuery,
      prodis: filteredData.slice(0, this.state.limit),
      pageCount,
      page: 1,
    });
  };

  componentDidMount() {
    this.getProdi();
>>>>>>> Stashed changes
  }
  render() {
    return (
      <Layout>
        <div className="m-1 bg-bw p-5 rounded-md min-h-screen">
          <h1 className="text-navy font-bold tracking-widest">
            Program Studi
            </h1>
          <div className="flex justify-end gap-2 my-3">
            <Input label="Cari berdasarkan nama" />
            <Button
              className="bg-navy whitespace-nowrap w-1/4"
              onClick={() => this.openModal()}
            >
              Tambah Program Studi
            </Button>
          </div>
<<<<<<< Updated upstream
          <TableProdi
            onDeleteItem={() => this.deleteData()}
            onEditItem={() => this.openEditModal()}
=======
          {this.state.isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
          <TableDosen
            data={this.state.prodis}
            onDeleteItem={this.deleteData}
            onEditItem={this.openEditModal}
            currentPage={this.state.page}
>>>>>>> Stashed changes
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
            items={this.state.items}
            isOpen={this.state.isModalEditOpen}
            onClose={() => this.closeEditModal()}
          />
        )}
      </Layout>
    );
  }
}
