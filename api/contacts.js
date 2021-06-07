const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
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

router.put("/:contactId", express.json(), async (req, res, next) => {
  const { contactId } = req.params;
  //   console.log(contactId);
  //   const updateContact = req.body;
  const { name, email, phone } = req.body;
  const newData = { contactId, name, email, phone };
  const data = await listContacts();
  const updated = await getContactById(contactId);
  const index = data.findIndex(({ id }) => contactId === id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  if (!newData.name || !newData.email || !newData.phone) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing some fields",
    });
  }
  await updateContact(newData);
  res.json({
    status: "Contact updated",
    code: 200,
    data: { result: updated },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await listContacts();
  const index = data.findIndex(({ id }) => contactId === id);
  //   console.log(index);
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
  //   console.log(data);
});

module.exports = router;
