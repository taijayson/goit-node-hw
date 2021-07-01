const path = require("path");
const fs = require("fs/promises");
const multer = require("multer");
const Jimp = require("jimp");
const { users: services } = require("../../services");

const tempDir = path.join(process.cwd(), "tmp");
const uploadDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 10240000 },
});

const upload = multer({
  storage,
});

const avatarUpload = async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const { ext } = path.parse(originalname);
  const avatarName = req.user.email.slice(0, req.user.email.lastIndexOf("@"));
  const fileName = path.join(uploadDir, `${avatarName}${ext}`);
  const { user } = req;
  try {
    await Jimp.read(tempName, async (err, file) => {
      if (err) throw err;
      file.resize(250, 250).write(fileName);
      await services.updateOne(user._id, { avatarUrl: fileName });
      await fs.unlink(tempName);
      res.json({
        status: "success",
        code: 200,
        data: {
          avatarUrl: fileName,
        },
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      code: 400,
      message: error.message,
    });
  }
};

module.exports = { upload, avatarUpload };
