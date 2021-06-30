const fs = require("fs").promises;
const fsStream = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
// const { avatar, upload } = require("./api/avatar");

require("dotenv").config();

const api = require("./api");

const app = express();

require("./configs/config-passport");

const accessLogStream = fsStream.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());

app.use("/api/users", api.users);
app.use("/api/contacts", api.contacts);

// app.post("/avatars", upload.single("avatar"), avatar);

// app.use(express.static("public"));
// app.use(express.static("avatars"));

const tempDir = path.join(process.cwd(), "public");
const uploadDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
  },
  limits: { fileSize: 10240000 },
});

const upload = multer({
  storage,
});
// console.log(upload);

app.post("/avatars", upload.single("avatar"), async (req, res, next) => {
  console.log(req.file);
  const { path: tempName, originalname } = req.file;
  // console.log(tempName);
  const fileName = path.join(uploadDir, originalname);

  try {
    await fs.rename(tempName, fileName);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          avatar: fileName,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempName);
    console.log("Wrong!Wrong!");
  }
});

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((error, _, res, __) => {
  console.log(error);
  const code = error.code || 500;
  const message = error.message || "Server error";
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

const { DB_HOST, PORT } = process.env;

const port = PORT || 3000;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log("Database connection successful");
    },
    (error) => {
      console.log("Connection error"), process.exit(1);
    }
  )
  .then(
    app.listen(port, () => {
      console.log(`Run at PORT:${port}`);
    })
  );
