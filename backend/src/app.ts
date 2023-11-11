import "framework/auth/passport";
import "reflect-metadata";
//
import { container } from "di/container.init";
import { registerBindings } from "di/di.config";
import { Router, default as express, json, urlencoded } from "express";
import session from "express-session";
import { createServer } from "http";
import { buildProviderModule } from "inversify-binding-decorators";
import { InversifyExpressServer } from "inversify-express-utils";
import { SessionAge } from "linked-models/user/auth.consts";
import mongoose from "mongoose";
import path from "path";

// import cors from "cors";
import cors from "cors";
import passport from "passport";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const customRouter = Router({ mergeParams: true });
const server = new InversifyExpressServer(container, customRouter);

server.setConfig((app) => {
  app.use(
    session({
      secret: process.env.COOKIE_KEY!,
      resave: false,
      saveUninitialized: false,
      proxy: true,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        // httpOnly: process.env.NODE_ENV === "production",
        httpOnly: false,
        secure: false,
        // secure: process.env.NODE_ENV === "production",
        maxAge: SessionAge,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(json({ limit: "100mb" }));
  app.use(urlencoded({ extended: true }));

  // Serve static files from the React frontend app
  app.use(
    express.static(path.join(__dirname, "..", "..", "frontend", "build"))
  );
  app.use("/app", (_, res) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "frontend", "build", "index.html")
    );
  });

  // if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  );
  // }
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

  // const socketService = new SocketNotificationService(httpServer);
  // container.bind(SocketNotificationService).toConstantValue(socketService);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log("API listening on port " + port);
  });
});
