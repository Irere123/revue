import { createContext } from "react";

import { User } from "@/__generated__/types";

interface AuthContextType {
  user: User | null | undefined;
  isAuthenticated: boolean;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});
