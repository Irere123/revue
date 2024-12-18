import "reflect-metadata";
import "dotenv/config";
import * as express from "express";

const PORT = process.env.PORT || 4000;

async function main() {
  const app = express();

  app.get("/", (_req, res) => {
    res.send("Hello world");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server started running on ${PORT}`);
  });
}

main();
