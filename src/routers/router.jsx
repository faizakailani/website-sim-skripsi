import { createBrowserRouter } from "react-router-dom";
import { commonPage, privatePage } from "../pages";
import RequireAuth from "./utils/requireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: commonPage.loginPage,
  },

  {
    path: "/",
    element: <RequireAuth redirectPath="/" />,
    children: [
      {
        path: "/dashboard",
        element: privatePage.dashboardPage,
      },
      {
        path: "/dosen",
        element: privatePage.dosenPage,
      },
      {
        path: "/mahasiswa",
        element: privatePage.mahasiswaPage,
      },
      {
        path: "/prodi",
        element: privatePage.prodiPage,
      },
      {
        path: "/skripsi",
        element: privatePage.skripsiPage,
      },
      {
        path: "/profile",
        element: privatePage.profilePage,
      },
    ],
  },
]);

export default router;
