import React, { useContext } from "react";
import { Bell, Home, Search } from "lucide-react";
import { Link } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { NavDropDown } from "./nav-dropdown";
import { Group } from "./icons";
import { CommandPalette } from "./command-palette";
import { AuthContext } from "@/contexts/auth-context";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(AuthContext);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <nav className="mx-auto min-h-12 w-full max-w-screen-md flex items-center justify-between py-8 sticky">
      <div className="text-2xl font-bold hidden md:flex items-center md:w-96">
        <Link to={`/u/${user?.username}`}>
          <Avatar>
            <AvatarImage src={user?.avatarUrl} alt={user?.displayName} />
            <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
      </div>

      <div className="flex gap-8 flex-1 items-center justify-center">
        <NavItem icon={<Home />} label="Home" />
        <NavItem
          icon={<Search onClick={() => setOpen(!open)} />}
          label="Search"
        />
        <NavItem icon={<Bell />} label="Notifications" />
        <Link to={`/community`}>
          <NavItem icon={<Group />} label="Community" />
        </Link>
      </div>

      <div className="text-2xl font-bold hidden md:flex justify-end items-center md:w-96">
        <NavDropDown />
      </div>
      <CommandPalette open={open} setOpen={setOpen} />
    </nav>
  );
}

const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <Tooltip>
    <TooltipTrigger>{icon}</TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);
