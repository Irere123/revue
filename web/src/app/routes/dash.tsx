import { ReviewPost } from "@/components/review-post";
import { Button } from "@/components/ui/button";
import withAuth from "@/lib/withAuth";

const reviewsPosts = [
  {
    id: 1,
    repo: {
      name: "react",
      owner: "facebook",
      description:
        "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    },
    tags: ["javascript", "frontend"],
    user: {
      id: 1,
      username: "jane",
      avatarUrl: "https://avatars.githubusercontent.com/u/1",
    },
  },
  {
    id: 2,
    repo: {
      name: "elixir",
      owner: "facebook",
      description:
        "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    },
    tags: ["javascript", "frontend"],
    user: {
      id: 1,
      username: "jane",
      avatarUrl: "https://avatars.githubusercontent.com/u/2",
    },
  },
];

function Dashboard() {
  return (
    <div className="flex flex-col sm:px-0 px-4">
      <div>
        <Button>Request</Button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {reviewsPosts.map((post) => (
          <ReviewPost
            key={post.id}
            repo={post.repo}
            id={post.id}
            user={post.user}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
}

const DashboardPage = withAuth(Dashboard);

export default DashboardPage;
