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
  //   console.log(result);
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

router.post("/", express.json(), async (req, res, next) => {
  //   console.log(req.body);
  const { name, email, phone } = req.body;
  //   console.log(name);
  const data = { name, email, phone };
  //   console.log(data);

  if (!data.name || !data.email || !data.phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing some contact data",
    });
  }
  await addContact(data);
  res.json({
    status: "contact added",
    code: 201,
    data: { result: data },
  });
});

router.delete("/id", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await listContacts();
  const remove = await removeContact(contactId);
});

module.exports = router;
