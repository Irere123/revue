import { Router } from "express";
import passport from "passport";

import { WEB_URL } from "../lib/constants";

export const authRouter = Router();

authRouter.get("/github", passport.authenticate("github", { session: false }));

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    if (req.user.user && req.session) {
      req.session.userId = req.user.user.id;
      req.session.githubAccessToken = req.user.githubAccessToken;
    }
    res.redirect(WEB_URL);
  }
);
