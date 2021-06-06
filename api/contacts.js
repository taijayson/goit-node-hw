const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../index");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

module.exports = router;
