import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartBar() {
  const data = {
    labels: ['Dosen', 'Mahasiswa', 'Program Studi', 'Skripsi'],
    datasets: [
      {
        label: 'Jumlah Data',
        data: [3, 2, 3, 1],
        backgroundColor: [
          'rgba(238, 111, 87, 1)',
          'rgba(0, 51, 78)',
          'rgba(238, 111, 87, 1)',
          'rgba(0, 51, 78)',
        ],
        borderColor: 'rgba(0,51,78,255)',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Jumlah Data',
      },
    },
  };

  return <Bar data={data} options={options} />;
}
