import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LANGUAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function OnBoardingPage() {
  return (
    <div>
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Customize your account</CardTitle>
          <CardDescription>
            Make your profile your own and start working!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Username</Label>
            <Input placeholder="What's you nickname..." name="name" />
          </div>
          <div>
            <Label htmlFor="displayName">Display name</Label>
            <Input
              placeholder="How should people address you?"
              name="displayName"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="displayName">I'm fluent in</Label>
            <Combobox
              items={LANGUAGES}
              displayKey="name"
              initialSelectedItems={LANGUAGES.slice(0, 2)}
              placeholder="Favorite languages.."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Get started!</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
