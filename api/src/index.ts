import "reflect-metadata";
import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";

import { RecipeResolver } from "./graphql";

const PORT = process.env.PORT || 4000;

async function main() {
  const app = express();

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
    expressMiddleware(server) as any
  );

  app.get("/", (_req, res) => {
    res.send("Hello world");
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

main();
