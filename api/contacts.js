const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../db/index");

const contactShema = require("../validation/validation");

//=========================GET==========================//

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
});

//=========================GET BY ID==========================//

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
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

//=========================ADD==========================//

router.post("/", express.json(), async (req, res, next) => {
  const { name, email, phone } = req.body;
  const data = { name, email, phone };
  const { error } = contactShema.validate(data);
  if (error !== undefined) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
  if (!data.name || !data.email || !data.phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing some fields",
    });
  }
  await addContact(data);
  res.json({
    status: "Contact added",
    code: 201,
    data: { result: data },
  });
});

//=========================UPDATE==========================//

router.put("/:contactId", express.json(), async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const data = { name, email, phone };

  const { error } = contactShema.validate(data);
  if (error !== undefined) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }

  const newData = { contactId, name, email, phone };
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => contactId === id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  if (!newData) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Need at least one field",
    });
  }
  await updateContact(newData);
  const result = await getContactById(contactId);
  res.json({
    status: "Contact updated",
    code: 200,
    data: { result: result },
  });
});

//=========================DELETE==========================//

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await listContacts();
  const index = data.findIndex(({ id }) => contactId === id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  await removeContact(contactId);
  res.json({
    status: "success",
    code: 204,
    message: "contact deleted",
  });
});

module.exports = router;
