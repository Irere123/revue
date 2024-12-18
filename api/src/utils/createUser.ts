import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const createUser = async ({
  username,
  githubId,
  avatarUrl,
  bio,
  displayName,
  githubAccessToken,
}: {
  username: string;
  githubId: string;
  avatarUrl: string;
  bio: string;
  displayName: string;
  githubAccessToken: string;
}): Promise<User | null> => {
  let user: User | null = null;
  let times = 0;

  while (times < 100) {
    try {
      user = await AppDataSource.getRepository(User).save({
        username: times ? `${username}${times}` : username,
        githubId,
        avatarUrl,
        bio,
        displayName,
        githubAccessToken,
      });
      break;
    } catch (err) {
      if (!err.detail.includes("already exists")) {
        throw err;
      }
    }
    times += 1;
  }

  return user;
};
