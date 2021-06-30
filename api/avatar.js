const path = require("path");
const fs = require("fs/promises");
const multer = require("multer");

const tempDir = path.join(process.cwd(), "temp");
const uploadDir = path.join(process.cwd(), "upload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    console.log(req.file);
    cb(null, file.originalName);
  },
  limits: { fileSize: 10240000 },
});

const upload = multer({
  storage,
});
// console.log(upload);

const avatar = async (req, res, next) => {
  console.log(req.file);
  const { path: tempName, originalname } = req.file;
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
};

module.exports = { avatar, upload };
