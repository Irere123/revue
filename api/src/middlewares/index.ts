import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { Router, Request, json } from "express";

import { COOKIE_NAME, IS_PROD, WEB_URL } from "../lib/constants";
import { redisClient } from "../redis";

const middlewares = Router();

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
});

middlewares.use(
  cors({
    origin: WEB_URL,
    credentials: true,
  })
);

middlewares.use(cookieParser());

if (!process.env.SESSION_SECRET && !process.env.TEST_DB) {
  throw new Error(
    "[middlewares/session] You have to provide the SESSION_SECRET environment variable."
  );
}

middlewares.use(
  session({
    name: COOKIE_NAME,
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false, // recommended: only save session when data exists
    resave: false, // required: force lightweight session keep alive (touch)
    store: redisStore,
    cookie: {
      httpOnly: IS_PROD,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      sameSite: "lax",
      secure: IS_PROD,
    },
  })
);

middlewares.use((req: any, _res: any, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb: any) => {
      cb();
    };
  }

  if (req.session && !req.session.save) {
    req.session.save = (cb: any) => {
      cb();
    };
  }

  next();
});

middlewares.use(json());

// Passport
middlewares.use(passport.initialize());
middlewares.use(passport.session());

middlewares.use((req: Request, _res, next) => {
  if (req.session && req.user) {
    (req as any).session.lastRequest = Date.now();
  }
  next();
});

export default middlewares;
