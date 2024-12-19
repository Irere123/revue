import { createClient } from "redis";
import { IS_PROD } from "./lib/constants";

// Initialize client.
export let redisClient = createClient({
  url: IS_PROD ? process.env.REDIS_URL : undefined,
});

redisClient.connect().catch(console.error);
