const fsStream = require("fs");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

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
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

app.listen(3000, () => {
  console.log("Run at PORT:3000");
});
