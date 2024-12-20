import { Outlet } from "react-router";

import withAuth from "@/lib/withAuth";
import { Navbar } from "../navbar";
import { AuthContext } from "@/contexts/auth-context";
import { User } from "@/__generated__/types";
import { GithubContextProvider } from "@/contexts/github-provider";

const AppLayout = withAuth(
  ({ user }: { user?: User | null }) => {
    return (
      <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
        <GithubContextProvider accessToken={user?.githubAccessToken as string}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="mx-auto w-full max-w-screen-md">
              <Outlet />
            </main>
          </div>
        </GithubContextProvider>
      </AuthContext.Provider>
    );
  },
  { requireAuth: true }
);

export default AppLayout;
