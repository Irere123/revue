import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            By continuing you agree to our terms and privacy policies
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">
            <Github /> Continue with Github
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
