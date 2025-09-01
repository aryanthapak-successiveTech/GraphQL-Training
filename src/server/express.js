import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { pubsub } from "./pubsub.js"; // Import the pubsub instance

import { typeDefs } from "../schema/typeDefs.js";
import { resolvers } from "../schema/resolvers.js";
import { config } from "dotenv";
import { connectDB } from "../config/dbConfig.js";
import jwt from "jsonwebtoken";


export async function createExpressServer() {
  const app = express();
  const httpServer = http.createServer(app);

  config();
  // Build executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  await connectDB();

  // Apollo Server setup
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  // Attach HTTP middleware
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        if(!req.headers.authorization)
        {
          return {pubsub}
        }

        const token=req.headers.authorization.split(" ")[1];
        const user=jwt.verify(token,process.env.JWT_SECRET);
        return { pubsub,user }
      },
    })
  );

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async () => ({ pubsub }), // 👈 inject pubsub in WS context
    
    },
    wsServer
  );

  return httpServer;
}

export const createApolloServer = createExpressServer;