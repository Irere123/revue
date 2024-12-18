import { Profile } from "passport-github2";

import { Request, Response } from "express";
import { User } from "../entity/User";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}

type Req = Request & { session: { lastRequest: string; user: User } };

export type GQLContext = {
  user: User;
  res: Response;
  req: Req;
};
