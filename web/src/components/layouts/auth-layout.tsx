import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Outlet />
    </div>
  );
}
