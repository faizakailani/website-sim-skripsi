import React, { Component } from "react";
import Layout from "../components/LayoutComponent";
import { Button } from "@material-tailwind/react";
import TambahDosen from "../components/Modals/TambahDosen";

export default class DosenPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

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
        </div>
        {this.state.isModalOpen && (
          <TambahDosen
            isOpen={this.state.isModalOpen}
            onClose={() => this.closeModal()}
          />
        )}
      </Layout>
    );
  }
}
