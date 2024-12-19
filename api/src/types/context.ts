import { Request, Response } from "express";
import { Session } from "express-session";
import { User } from "../entity/User";

declare module "express-session" {
  interface Session {
    userId?: number;
    accessToken?: string;
    refreshToken?: string;
  }
}

export interface GQLContext {
  req: Request & { session: Session };
  res: Response;
}
