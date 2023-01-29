const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todosRouter = require("./routes/todo.route");
const userRouter = require("./routes/user.route");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB ok");
});


mongoose.connection.on('open', () => {
  //register instances once the connection has been established
  registerBindings(container);
  container.load(buildProviderModule());

  const app = server.build();
  const httpServer = createServer(app);

  const socketService = new SocketService(httpServer);
  container.bind(SocketService).toConstantValue(socketService);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('API listening on port ' + port);
  });
});

app.use("/todos", todosRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
