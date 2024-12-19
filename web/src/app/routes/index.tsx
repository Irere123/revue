import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import withAuth from "@/lib/withAuth";
import { Link } from "react-router";

function HomePage() {
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
          <Link to={`${API_URL}/auth/github`}>
            <Button className="w-full">
              <Github /> Continue with Github
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

const AuthenticatedHomePage = withAuth(HomePage, { requireAuth: false });
export default AuthenticatedHomePage;
