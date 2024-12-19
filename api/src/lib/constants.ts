export const IS_PROD = process.env.NODE_ENV === "production";
export const API_URL = IS_PROD
  ? "https://api.revue.dev"
  : "http://localhost:4000";

export const WEB_URL = IS_PROD ? "https://revue.dev" : "http://localhost:5173";
export const COOKIE_NAME = "qid";
