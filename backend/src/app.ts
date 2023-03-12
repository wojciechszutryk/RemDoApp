import { container } from "di/container.init";
import { registerBindings } from "di/di.config";
import { json, Router, urlencoded } from "express";
import { createServer } from "http";
import { buildProviderModule } from "inversify-binding-decorators";
import { InversifyExpressServer } from "inversify-express-utils";
import mongoose from "mongoose";
import "reflect-metadata";

import cors from "cors";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const customRouter = Router({ mergeParams: true });
const server = new InversifyExpressServer(container, customRouter);

const port = process.env.PORT || 3001;

server.setConfig((app) => {
  app.use(json({ limit: "100mb" }));
  app.use(urlencoded({ extended: true }));
  app.use(cors());
});

//Connect to MongoDb
if (!process.env.DB_URI) throw new Error("DB_URI undefined");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI, {});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) => {
  // eslint-disable-next-line no-console
  console.error.bind(console, "MongoDB connection error:" + error);
});

mongoose.connection.on("open", () => {
  //register instances once the connection has been established
  registerBindings(container);
  container.load(buildProviderModule());

  const app = server.build();
  const httpServer = createServer(app);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log("API listening on port " + port);
  });
});
