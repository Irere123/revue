import { Outlet } from "react-router";
import { Navbar } from "../navbar";
import withAuth from "@/lib/withAuth";
import { User } from "@/graphql/graphql";
import { AuthContext } from "@/contexts/auth-context";

const AppLayout = withAuth(
  ({ user }: { user?: User | null }) => {
    return (
      <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="mx-auto w-full max-w-screen-md">
            <Outlet />
          </main>
        </div>
      </AuthContext.Provider>
    );
  },
  { requireAuth: true }
);

export default AppLayout;
