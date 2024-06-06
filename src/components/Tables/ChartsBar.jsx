import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data = [] }) => {
  const mappedValues = data.map((item) => {
    const key = Object.keys(item)[0];
    return item[key];
  });

  const chartData = {
    labels: [
      "Semua Data",
      "Dosen",
      "Program Studi",
      "Log User",
      "Mahasiswa",
      "Skripsi",
    ],
    datasets: [
      {
        label: "Jumlah Data",
        data: mappedValues,
        backgroundColor: [
          "rgba(238, 111, 87, 1)",
          "rgba(0, 51, 78)",
          "rgba(238, 111, 87, 1)",
          "rgba(0, 51, 78)",
        ],
        borderColor: "rgba(0,51,78,255)",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Jumlah Data",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Chart;
