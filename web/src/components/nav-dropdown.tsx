import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LogoutQuery = gql`
  mutation LogoutQuery {
    logout
  }
`;

export function NavDropDown() {
  const [logout, { loading }] = useMutation(LogoutQuery);
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <Link to={`https://github.com/irere123/revue/issues`}>
          <DropdownMenuItem>Feedback</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={async () => {
            const resp = await logout();
            if (resp.data?.logout) {
              navigate("/");
            }
          }}
          disabled={loading}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
