import "reflect-metadata";
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";

import { init as initPassport } from "./authentication";
import { RecipeResolver } from "./graphql";
import { COOKIE_NAME, IS_PROD } from "./lib/constants";
import { authRouter } from "./routes/auth";
import { AppDataSource } from "./data-source";
import { GQLContext } from "./types/context";

const PORT = process.env.PORT || 4000;

async function main() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
      AppDataSource.runMigrations();
      console.log("Migrations have been run!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  initPassport();

  const app = express();

  if (IS_PROD) {
    app.set("trust proxy", 1); // trust first proxy
  }

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const qid = authorization.split(" ")[1];
        req.headers.cookie = `${COOKIE_NAME}=${qid}`;
      } catch {}
    }

    return next();
  });

  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  });

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { res, req };
      },
    }) as any
  );

  app.use("/auth", authRouter);
  app.get("/", (_req, res) => {
    res.send("Hello world");
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

main();
