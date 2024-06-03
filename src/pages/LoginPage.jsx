import React, { Component } from "react";
import { IMAGES } from "../assets";
import { Button, Input } from "@material-tailwind/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  handleShowPassword() {
    this.setState({ showPassword: true });
  }

  handleHidePassword() {
    this.setState({ showPassword: false });
  }

  render() {
    return (
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
                <Input type="email" label="Email" required />
              </div>
              <div className="w-full">
                <Input
                  type={this.state.showPassword ? "text" : "password"}
                  label="Password"
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
              <Link to={"/dashboard"} className="w-full">
                <Button className="bg-navy" fullWidth>
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
