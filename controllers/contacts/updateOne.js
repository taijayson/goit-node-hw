const { contact: service } = require("../../services");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  // const { name, email, phone } = req.body;
  // const data = { name, email, phone };

  //   const { error } = contactShema.validate(data);
  //   if (error !== undefined) {
  //     return res.status(400).json({
  //       status: "error",
  //       code: 400,
  //       message: error.message,
  //     });
  //   }

  // const newData = { contactId, name, email, phone };
  // const index = contacts.findIndex(({ id }) => contactId === id);
  // if (index === -1) {
  //   return res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: "Not found",
  //   });
  // }
  // if (!newData) {
  //   return res.status(400).json({
  //     status: "error",
  //     code: 400,
  //     message: "Need at least one field",
  //   });
  // }
  // await updateContact(newData);
  // const result = await getContactById(contactId);
  try {
    const result = await service.updateOne(contactId, req.body);
    res.json({
      status: "Contact updated",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
