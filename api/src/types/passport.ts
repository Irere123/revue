import { Profile } from "passport-github2";

import { Request, Response } from "express";
import { User } from "../entity/User";

export interface GithubProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}
