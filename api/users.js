const express = require("express");
const router = express.Router();
const useAuth = require("./useAuth");

const { users: controllers } = require("../controllers");

router.post("/signup", express.json(), controllers.signup);

router.post("/login", express.json(), controllers.login);

router.get("/current", useAuth, controllers.getCurrent);

router.post("/logout", useAuth, controllers.logout);

router.post(
  "/avatars",
  useAuth,
  controllers.avatar.upload.single("avatar"),
  controllers.avatar.avatarUpload
);

router.get("/verify/:verifyToken", controllers.verify);

router.post("/verify", express.json(), controllers.resend);

module.exports = router;
