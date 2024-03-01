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

server.setConfig((app) => {
  app.use(
    session({
      secret: process.env.COOKIE_KEY!,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
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

  if (process.env.NODE_ENV === "development") {
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

//Connect to MongoDb
if (!process.env.DB_URI) throw new Error("DB_URI undefined");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI, {
  tls: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) => {
  // eslint-disable-next-line no-console
  console.error.bind(console, "MongoDB connection error:" + error);

  httpServer.close();
});

mongoose.connection.on("disconnected", () => {
  // eslint-disable-next-line no-console
  console.log("MongoDB disconnected");
  httpServer.close();
});

mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB");
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log("API listening on port " + port);
  });

  httpServer.on("error", (error) => {
    // eslint-disable-next-line no-console
    console.error("Server error: " + error);
  });
});
