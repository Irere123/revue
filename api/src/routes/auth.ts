import { Router } from "express";
import passport from "passport";

import { WEB_URL } from "../lib/constants";

export const authRouter = Router();

authRouter.get("/github", passport.authenticate("github", { session: false }));

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req: any, res) => {
    if (req.user.user.id && req.session) {
      req.session.userId = req.user.user.id;
      req.session.accessToken = req.user.accessToken;
      req.session.refreshToken = req.user.refreshToken;
    }
    res.redirect(WEB_URL);
  }
);
