import { Link, Outlet } from "react-router";

const FocusLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-auto min-h-12 w-full max-w-screen-md flex justify-center py-8">
        <Link to={`/dash`}>
          <h1 className="text-2xl font-bold text-center py-8">Revue</h1>
        </Link>
      </div>
      <main className="mx-auto w-full max-w-screen-md">
        <Outlet />
      </main>
    </div>
  );
};

export default FocusLayout;
