const fsStream = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const api = require("./api");

const app = express();

const accessLogStream = fsStream.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan("combined", { stream: accessLogStream }));

app.use(morgan(formatsLogger));

app.use(cors());

app.use("/api/contacts", api.contacts);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((error, _, res, __) => {
  const code = error.code || 500;
  const message = error.message || "Server error";
  res
    .status(code)
    .json({
      status: "fail",
      code,
      message,
    })
    .then(console.log("Connection error"), process.exit(1));
});

const { DB_HOST, PORT } = process.env;

const port = PORT || 3000;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    app.listen(port, () => {
      console.log(`Run at PORT:${port}`);
    })
  )
  .then(console.log("Database connection successful"));
