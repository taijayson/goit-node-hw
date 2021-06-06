const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const api = require("./api");

const app = express();

app.use(cors());

app.use("/api/contacts", api.contacts);

app.listen(3000, () => {
  console.log("run at 3000");
});
