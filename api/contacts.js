const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../index");

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
});

router.get("/:contactId", async (req, res, next) => {
  //   console.log(req.params);
  const { contactId } = req.params;
  //   console.log(contactId);
  const result = await getContactById(contactId);
  //   console.log(result);
  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

module.exports = router;
