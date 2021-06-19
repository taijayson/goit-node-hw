const express = require("express");
const router = express.Router();
const useAuth = require("./useAuth");

const { contacts } = require("../controllers");

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getOne);

router.post("/", express.json(), useAuth, contacts.addOne);

router.put("/:contactId", express.json(), contacts.updateOne);

router.patch("/:contactId/favorite", express.json(), contacts.updateStatus);

router.delete("/:contactId", contacts.removeOne);

module.exports = router;
