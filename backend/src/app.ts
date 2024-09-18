import "framework/auth/passport";
import "reflect-metadata";
//
import MongoStore from "connect-mongo";
import cors from "cors";
import { container } from "di/container.init";
import { registerBindings } from "di/di.config";
import { json, urlencoded } from "express";
import session from "express-session";
import { createServer } from "http";
import { buildProviderModule } from "inversify-binding-decorators";
import { InversifyExpressServer } from "inversify-express-utils";
import { SessionAge } from "linked-models/user/auth.consts";
import mongoose from "mongoose";
import passport from "passport";
import { SocketNotificationService } from "services/notification/socket.notification.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

registerBindings(container);

const server = new InversifyExpressServer(container);

const isProduction = process.env.NODE_ENV === "production";

server.setConfig((app) => {
  app.use(
    session({
      secret: process.env.COOKIE_KEY!,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        sameSite: isProduction ? "strict" : "lax",
        httpOnly: isProduction,
        secure: isProduction,
        maxAge: SessionAge,
      },
      store: MongoStore.create({
        mongoUrl: process.env.DB_URI!,
        ttl: SessionAge,
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(json({ limit: "100mb" }));
  app.use(urlencoded({ extended: true }));

  if (!isProduction) {
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        exposedHeaders: ["set-cookie"],
      })
    );
  }
});

container.load(buildProviderModule());
const app = server.build();
const httpServer = createServer(app);
const socketService = new SocketNotificationService(httpServer);
container.bind(SocketNotificationService).toConstantValue(socketService);

const connectToMongo = () => {
  mongoose.set("strictQuery", false);

  if (!process.env.DB_URI) throw new Error("DB_URI undefined");
  mongoose.connect(process.env.DB_URI, {});
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", (error) => {
    // eslint-disable-next-line no-console
    console.error.bind(console, "MongoDB connection error:" + error);
    console.log("MongoDB connection error: " + error);
  });

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Reconnecting...");
    setTimeout(connectToMongo, 5000);
  });
};

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

httpServer.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("API listening on port " + port);
  connectToMongo();
});

httpServer.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
});
