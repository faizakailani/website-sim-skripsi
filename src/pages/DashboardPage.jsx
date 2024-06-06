import { Component } from "react";
import Layout from "../components/LayoutComponent";
import { IoPeople } from "react-icons/io5";
import { FaBook, FaPeopleGroup } from "react-icons/fa6";
import { GoServer } from "react-icons/go";
import ChartBar from "../components/Tables/ChartsBar";
import DashboardService from "../services/service/DashboardService";

export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      countDosen: 0,
      countLogUsers: 0,
      countMahasiswa: 0,
      countSkripsi: 0,
      countStudi: 0,
      charts: [],
    };
  }
  getData = () => {
    try {
      this.setState({ isLoading: true });
      DashboardService.GetData().then((res) => {
        this.setState({
          countDosen: res.data.data.countDosen,
          countLogUsers: res.data.data.countLogUsers,
          countMahasiswa: res.data.data.countMahasiswa,
          countSkripsi: res.data.data.countSkripsi,
          countStudi: res.data.data.countStudi,
          charts: res.data.data.chart,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Layout>
        <div className="flex flex-col m-1 bg-bw p-5 rounded-md">
          <div className="flex m-1">
            <div className="text-navy font-bold tracking-widest mr-2">
              Dashboard
            </div>
            <div className="text-navy tracking-widest">Statistic Overview</div>
          </div>
          <div className="flex flex-wrap justify-center m-5">
            <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl m-4 p-2 flex flex-col items-center">
              <div className="px-6 py-4 flex items-center">
                <IoPeople className="w-12 h-12 mr-4" />
                <div className="font-bold text-xl py-2">
                  {this.state.countDosen}
                </div>
              </div>
              <div className="px-6 flex flex-col items-center">
                <p className="text-gray-700 text-base text-center">Dosen</p>
                <button className="bg-navy text-white px-3 py-3 mt-4 rounded ">
                  <a href="/dosen">View Details</a>
                </button>
              </div>
            </div>

            <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl m-4 p-2 flex flex-col items-center">
              <div className="px-6 py-4 flex items-center">
                <FaBook className="w-12 h-12 mr-4" />
                <div className="font-bold text-xl py-2">
                  {this.state.countStudi}
                </div>
              </div>
              <div className="px-6 flex flex-col items-center">
                <p className="text-gray-700 text-base text-center">
                  Program Studi
                </p>
                <button className="bg-navy text-white px-3 py-3 mt-4 rounded ">
                  <a href="/prodi">View Details</a>
                </button>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl m-4 p-2 flex flex-col items-center">
              <div className="px-6 py-4 flex items-center">
                <GoServer className="w-12 h-12 mr-4" />
                <div className="font-bold text-xl py-2">
                  {this.state.countLogUsers}
                </div>
              </div>
              <div className="px-6 flex flex-col items-center">
                <p className="text-gray-700 text-base text-center">Log User</p>
                <button className="bg-navy text-white px-3 py-3 mt-4 rounded ">
                  <a href="/log">View Details</a>
                </button>
              </div>
            </div>

            <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl m-4 p-2 flex flex-col items-center">
              <div className="px-6 py-4 flex items-center">
                <FaPeopleGroup className="w-12 h-12 mr-4" />
                <div className="font-bold text-xl py-2">
                  {this.state.countMahasiswa}
                </div>
              </div>
              <div className="px-6 flex flex-col items-center">
                <p className="text-gray-700 text-base text-center">Mahasiswa</p>
                <button className="bg-navy text-white px-3 py-3 mt-4 rounded ">
                  <a href="/mahasiswa">View Details</a>
                </button>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl m-4 p-2 flex flex-col items-center">
              <div className="px-6 py-4 flex items-center">
                <IoPeople className="w-12 h-12 mr-4" />
                <div className="font-bold text-xl py-2">
                  {this.state.countSkripsi}
                </div>
              </div>
              <div className="px-6 flex flex-col items-center">
                <p className="text-gray-700 text-base text-center">Skripsi</p>
                <button className="bg-navy text-white px-3 py-3 mt-4 rounded ">
                  <a href="/skripsi">View Details</a>
                </button>
              </div>
            </div>
          </div>
          <div className="flex m-1">
            <div className="text-navy font-bold tracking-widest mr-2">
              Chart
            </div>
            <div className="text-navy tracking-widest">Statistic Overview</div>
          </div>
          <ChartBar data={this.state.charts} />
        </div>
      </Layout>
    );
  }
}
