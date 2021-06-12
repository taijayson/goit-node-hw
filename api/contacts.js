const express = require("express");
const router = express.Router();

const { contacts } = require("../controllers");

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getOne);

router.post("/", express.json(), contacts.addOne);

router.put("/:contactId", express.json(), contacts.updateOne);

router.patch("/:contactId", express.json(), contacts.updateStatus);

router.delete("/:contactId", contacts.removeOne);

module.exports = router;
