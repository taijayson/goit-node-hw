const express = require("express");
const router = express.Router();

const { contacts } = require("../controllers");

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getOne);

router.post("/", express.json(), contacts.addOne);

router.put("/:contactId", express.json(), contacts.update);

router.delete("/:contactId", contacts.remove);

module.exports = router;
