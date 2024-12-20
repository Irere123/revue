import { Outlet } from "react-router";

import withAuth from "@/lib/withAuth";
import { Navbar } from "../navbar";
import { AuthContext } from "@/contexts/auth-context";
import { User } from "@/__generated__/types";

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
