import { Component } from "react";
import Layout from "../components/LayoutComponent";
import { Button, Input, Spinner } from "@material-tailwind/react";
import TableProdi from "../components/Tables/TableProdi";
import AlertComponent from "../components/AlertComponent";
import ReactPaginate from "react-paginate";
import TambahProdi from "../components/Modals/TambahProdi";
import EditProdi from "../components/Modals/EditProdi";
import ProgramStudiService from "../services/service/ProgramStudiService";

export default class ProdiPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isModalEditOpen: false,
      page: 1,
      limit: 10,
      prodis: [],
      allProdis: [],
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

  deleteData = (kode) => {
    AlertComponent.DeleteConfirmation("Hapus Data Prodi").then(async (e) => {
      if (e.isConfirmed) {
        try {
          ProgramStudiService.DeleteProdi(kode).then((res)=> {
            if (res.status === 200 ) {
              AlertComponent.SuccessResponse(res.data.message);
              setInterval(() => {
                window.location.reload();
              }, 2000);
            }else {
              AlertComponent.Error(res.data.message);
            }
          });
        } catch (error) {
          AlertComponent.showError("Error", error);
        }
      }
    });
  };

  getProdi = () => {
    const kode = {
      orderBy: "ASC",
      sortBy: "kode",
      limit: 1000,
      include_inactive: false,
      page: 1,
    };
    this.setState({ isLoading: true });
    try{
      ProgramStudiService.GetProdi(kode).then((res) => {
        const allProdis = res.data.data;
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
      prodi.kaprodi.toLowerCase().includes(searchQuery.toLowerCase())
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
  }
  
  render() {
    return (
      <Layout>
        <div className="m-1 bg-bw p-5 rounded-md min-h-screen">
          <h1 className="text-navy font-bold tracking-widest">
            Program Studi
            </h1>
          <div className="flex justify-end gap-2 my-3">
            <Input 
            label="Cari Berdasarkan Nama Kaprodi"
            value={this.state.searchQuery}
            onChange={this.handleSearch}
            />
            <Button
              className="bg-navy whitespace-nowrap w-1/4"
              onClick={() => this.openModal()}
            >
              Tambah Program Studi
            </Button>
          </div>
          {this.state.isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <TableProdi
              data={this.state.prodis}
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
