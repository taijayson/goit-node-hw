const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");

const api = require("./api");

const app = express();

app.use(cors());

app.use("/api/contacts", api.contacts);
// app.use("/api/contacts/:id", api.contacts);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.listen(3000, () => {
  console.log("run at 3000");
});
