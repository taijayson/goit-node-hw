const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");

const api = require("./api");

const app = express();

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
  // const {code = 500, message = "Server error"} = error;
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

app.listen(3000, () => {
  console.log("run at PORT:3000");
});
