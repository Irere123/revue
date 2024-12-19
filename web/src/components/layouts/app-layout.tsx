import { Outlet } from "react-router";
import { Navbar } from "../navbar";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-screen-md">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
