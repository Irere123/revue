import { ScanText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";

interface ReviewPostProps {
  id: number;
  tags?: string[];
  user: { id: number; username: string; avatarUrl: string };
  repo: {
    name: string;
    owner: string;
    description: string;
  };
}

export const ReviewPost: React.FC<ReviewPostProps> = ({
  id,
  repo,
  tags,
  user,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-xl border bg-card text-card-foreground shadow p-4 cursor-pointer"
      onClick={() => navigate(`/review/${id}`)}
    >
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <p className="font-bold">{repo.name}</p>
        </div>
        <div>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => navigate(`/review/${repo.owner}/${repo.name}`)}
          >
            <ScanText />
            Review
          </Button>
        </div>
      </div>
      <div className="pl-14 pt-4">
        <p className="text-sm text-foreground">{repo.description}</p>
        {tags && (
          <div className="flex gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
