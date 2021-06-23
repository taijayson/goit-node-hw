const express = require("express");
const router = express.Router();
const useAuth = require("./useAuth");

const { users: controllers } = require("../controllers");

router.post("/signup", express.json(), controllers.signup);

router.post("/login", express.json(), controllers.login);

router.get("/current", useAuth, controllers.getCurrent);

module.exports = router;
