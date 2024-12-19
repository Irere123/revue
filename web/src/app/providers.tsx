import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TooltipProvider>{children}</TooltipProvider>;
};
