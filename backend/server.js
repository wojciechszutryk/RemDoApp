const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todosRouter = require("./routes/todo");
const userRouter = require("./routes/user");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB ok");
});

app.use("/todos", todosRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
