import React, { Component } from "react";
import Layout from "../components/LayoutComponent";
import { Button } from "@material-tailwind/react";
import { BsPersonFill } from "react-icons/bs";
import UserService from "../services/service/UserService";
import EditProfile from "../components/Modals/EditProfile";
import UbahPassword from "../components/Modals/UbahPassword";

export default class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      profiles: {},
      isEditProfileOpen: false,
      isUbahPasswordOpen: false,
    };
  }

  getProfile() {
    UserService.GetProfile().then((res) => {
      if (res.status === 200) {
        this.setState({ profiles: res.data.data });
      }
    });
  }

  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <Layout>
        <div className=" flex flex-col md:flex-row md:gap-10 m-1 bg-bw p-5 rounded-md min-h-screen">
          <div className="h-32 w-32 border-2 border-black rounded-full flex justify-center items-center">
            <BsPersonFill size={100} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <div className="flex flex-col gap-3 md:order-1">
                <div>
                  <label className="text-xs">Nama Pengguna:</label>
                  <h3 className="font-bold">
                    {this.state.profiles ? this.state.profiles.username : "-"}
                  </h3>
                </div>
                <div>
                  <label className="text-xs">Email Pengguna:</label>
                  <h3 className="font-bold">
                    {this.state.profiles ? this.state.profiles.email : "-"}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:order-3">
                <div>
                  <label className="text-xs">Nomor Telepon:</label>
                  <h3 className="font-bold">
                    {this.state.profiles ? this.state.profiles.telp : "-"}
                  </h3>
                </div>
                <div>
                  <label className="text-xs">Alamat:</label>
                  <h3 className="font-bold">
                    {this.state.profiles ? this.state.profiles.alamat : "-"}
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-navy rounded-full"
                size="sm"
                onClick={() => this.setState({ isEditProfileOpen: true })}
              >
                Edit
              </Button>
              <Button
                className="bg-blue rounded-full mt-2 md:mt-0"
                size="sm"
                onClick={() => this.setState({ isUbahPasswordOpen: true })}
              >
                Ubah Password
              </Button>
            </div>
          </div>
        </div>
        {this.state.isEditProfileOpen && (
          <EditProfile
            isOpen={this.state.isEditProfileOpen}
            onClose={() => this.setState({ isEditProfileOpen: false })}
            data={this.state.profiles}
          />
        )}
        {this.state.isUbahPasswordOpen && (
          <UbahPassword
            isOpen={this.state.isUbahPasswordOpen}
            onClose={() => this.setState({ isUbahPasswordOpen: false })}
            data={this.state.profiles.email}
          />
        )}
      </Layout>
    );
  }
}
