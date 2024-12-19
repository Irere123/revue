import { Bell, Home, Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { NavDropDown } from "./nav-dropdown";

export function Navbar() {
  return (
    <nav className="mx-auto min-h-12 w-full max-w-screen-md flex items-center justify-between py-8">
      <div className="text-2xl font-bold hidden md:flex items-center md:w-96">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex gap-8 flex-1 items-center justify-center">
        <NavItem icon={<Home />} label="Home" />
        <NavItem icon={<Search />} label="Search" />
        <NavItem icon={<Bell />} label="Notifications" />
        <NavItem icon={<User />} label="Profile" />
      </div>

      <div className="text-2xl font-bold hidden md:flex justify-end items-center md:w-96">
        <NavDropDown />
      </div>
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
