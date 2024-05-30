import NavbarComponent from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="relative flex flex-col w-full lg:w-[100%] h-screen overflow-hidden">
        <NavbarComponent /> 
        <main className="px-2 md:px-0 w-full overflow-auto">
          {children}
        </main>
      </div> 
    </div>
  );
};

export default Layout;
