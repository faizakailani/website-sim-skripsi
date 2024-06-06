import React, { Component } from "react";
import { IMAGES } from "../assets";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import UserService from "../services/service/UserService";
import AlertComponent from "../components/AlertComponent";
import User from "../localStorages/User";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      username: "",
      password: "",
      refferer: false,
      isLoading: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleShowPassword() {
    this.setState({ showPassword: true });
  }

  handleHidePassword() {
    this.setState({ showPassword: false });
  }

  validasi() {
    if (this.state.username === "") {
      AlertComponent.Error("Username harus diisi!");
    } else if (this.state.password === "") {
      AlertComponent.Error("Password harus diisi!");
    } else {
      this.onLogin();
    }
  }

  onLogin() {
    this.setState({ isLoading: true });
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    try {
      UserService.Login(data)
        .then((res) => {
          if ((res.data.status = 200)) {
            User.SaveToken(res.data.data.access_token);
            this.setState({ isLoading: false });
            this.setState({ refferer: true });
            AlertComponent.SuccessResponse("Berhasil Login");
          }
        })
        .catch((e) => {
          AlertComponent.Error(e.response.data.message);
        });
    } catch (error) {
      AlertComponent.Error(error);
    }
  }

  render() {
    return this.state.refferer ? (
      <Navigate to={"/dashboard"} />
    ) : (
      <>
        <div className="relative h-screen min-h-screen bg-gray-100 w-full flex justify-center items-center overflow-hidden">
          <div className="shadow-lg bg-white w-[90%] h-[55%] lg:w-[50rem] lg:h-[27rem] rounded-2xl flex">
            <div className="relative h-full w-[80%] p-3 rounded-2xl bg-red-800 hidden lg:flex flex-col justify-center items-center gap-7">
              <img src={IMAGES.logo} className="w-60" alt="kd logo" />
            </div>
            <div className="p-7 lg:p-10 h-full w-full lg:border-none rounded-2xl lg:rounded-l-none lg:rounded-r-2xl flex flex-col justify-center items-center gap-3 text-main">
              <div className="w-full">
                <h1 className="text-2xl font-bold inline-block mb-5">Login</h1>
                <h2 className="text-xl font-bold">Selamat Datang,</h2>
                <p className="text-xs">
                  Masukan akun untuk melanjutkan ke <br />
                  <span className="font-bold">SIM Skripsi</span>
                </p>
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  label="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="w-full">
                <Input
                  type={this.state.showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  icon={
                    this.state.showPassword ? (
                      <AiFillEye
                        className="cursor-pointer"
                        onClick={() =>
                          this.state.showPassword
                            ? this.handleHidePassword()
                            : this.handleShowPassword()
                        }
                      />
                    ) : (
                      <AiFillEyeInvisible
                        className="cursor-pointer"
                        onClick={() =>
                          this.state.showPassword
                            ? this.handleHidePassword()
                            : this.handleShowPassword()
                        }
                      />
                    )
                  }
                  required
                />
              </div>
              <Button
                className="bg-navy"
                fullWidth
                onClick={() => this.validasi()}
              >
                {this.state.isLoading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  "Masuk"
                )}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
