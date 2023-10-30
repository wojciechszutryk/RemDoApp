import "framework/auth/passport";
import "reflect-metadata";
//
import cookieSession from "cookie-session";
import { container } from "di/container.init";
import { registerBindings } from "di/di.config";
import { json, Router, urlencoded } from "express";
import { createServer } from "http";
import { buildProviderModule } from "inversify-binding-decorators";
import { InversifyExpressServer } from "inversify-express-utils";
import mongoose from "mongoose";

import passport from "passport";

import { SocketNotificationService } from "services/notification/socket.notification.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const customRouter = Router({ mergeParams: true });
const server = new InversifyExpressServer(container, customRouter);

server.setConfig((app) => {
  app.set("trust proxy", true);
  app.use(
    cookieSession({
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY!],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(json({ limit: "100mb" }));
  app.use(urlencoded({ extended: true }));
  // app.use(
  //   cors({
  //     // origin: process.env.CLIENT_URL,
  //     origin: true,
  //     methods: "GET,POST,PUT,DELETE",
  //     credentials: true,
  //     exposedHeaders: ["set-cookie"],
  //   })
  // );
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "https://wojciechszutryk.github.io/RemDoApp"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });
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

  const socketService = new SocketNotificationService(httpServer);
  container.bind(SocketNotificationService).toConstantValue(socketService);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log("API listening on port " + port);
  });
});
