import { Home, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";

import { Github } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full h-52">
        <CardHeader className="flex justify-between flex-row">
          <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <p>@profile.username</p>
          </div>
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="usernmae" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <p>Hello world</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center flex-row text-sm">
          <div className="flex gap-4">
            <p>400 Contributions</p>
          </div>
          <div className="flex gap-4">
            <Link to={`/dash`}>
              <Home className="h-5 w-5 cursor-pointer" />
            </Link>
            <Github className="h-5 w-5 cursor-pointer" />
            <MoreHorizontal className="h-5 w-5 cursor-pointer" />
          </div>
        </CardFooter>
      </Card>
      <div className="py-8">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="stack">Stack</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="activity">Change your password here.</TabsContent>
          <TabsContent value="people">Change your email here.</TabsContent>
          <TabsContent value="stack">Change your email here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}