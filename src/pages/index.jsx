import DashboardPage from "./DashboardPage";
import DosenPage from "./DosenPage";
import LoginPage from "./LoginPage";
import MahasiswaPage from "./MahasiswaPage";
import ProdiPage from "./ProdiPage";
import ProfilePage from "./ProfilePage";
import SkripsiPage from "./SkripsiPage";

export const commonPage = {
  loginPage: <LoginPage />,
};

export const privatePage = {
  dashboardPage: <DashboardPage />,
  dosenPage: <DosenPage />,
  mahasiswaPage: <MahasiswaPage />,
  prodiPage: <ProdiPage />,
  skripsiPage: <SkripsiPage />,
  profilePage: <ProfilePage />,
};
