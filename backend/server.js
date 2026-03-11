import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { WebSocketServer } from "ws";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import healthRoutes from "./routes/healthRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import { apiLimiter } from "./middlewares/rateLimit.js";
import { onJobUpdate } from "./services/jobStore.js";

dotenv.config();

const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || "127.0.0.1";
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:3001";
const allowedOrigins = ORIGIN.split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(logger);
app.use(apiLimiter);
app.use(healthRoutes);
app.use(exportRoutes);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.use(errorHandler);

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (socket) => {
  socket.send(JSON.stringify({ type: "connected" }));
});

onJobUpdate((job) => {
  const payload = JSON.stringify({ type: "job-update", job });
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(payload);
    }
  }
});

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://${HOST}:${PORT}`);
});
