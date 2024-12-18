import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";

import { GithubProfile } from "./types/passport";
import { API_URL } from "./lib/constants";
import { User } from "./entity/User";
import { createUser } from "./utils/createUser";
import { AppDataSource } from "./data-source";

const isSerializedJSON = (str: string) =>
  str[0] === "{" && str[str.length - 1] === "}";

const init = () => {
  passport.serializeUser((user, done) => {
    done(null, typeof user === "string" ? user : JSON.stringify(user));
  });

  // `data` is the full user data
  // to avoid having to go to the db on every single request.
  passport.deserializeUser((data: string, done) => {
    if (isSerializedJSON(data)) {
      let user;

      // Ignore errors if our isSerializedJSON heuristic is wrong and `data` isn't serialized JSON
      try {
        user = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }

      if (user && user.id && user.createdAt) {
        return done(null, user);
      }
    }
  });

  // Set up github login
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: `${API_URL}/auth/github/callback`,
        passReqToCallback: true,
      },
      async (
        _req: any,
        accessToken: any,
        _refreshToken: any,
        userProfile: any,
        done: any
      ) => {
        const profile = userProfile as unknown as GithubProfile;

        let user = await AppDataSource.manager.findOne(User, {
          where: { githubId: profile.id },
        });

        if (!user) {
          user = await createUser({
            avatarUrl: profile.photos![0].value,
            bio: profile._json.bio,
            githubId: profile.id,
            displayName: profile.displayName,
            githubAccessToken: accessToken,
            username: profile.username as string,
          });
        }

        console.log(user);
        done(null, user);
      }
    )
  );
};

export { init };
