const express = require("express");
const router = express.Router();

const { users: controllers } = require("../controllers");

router.post("/signup", express.json(), controllers.signup);

router.post("/login", express.json(), controllers.login);

module.exports = router;
