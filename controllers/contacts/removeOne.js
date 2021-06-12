const { contact: service } = require("../../services");

const removeOne = async (req, res, next) => {
  const { contactId } = req.params;
  // const data = await listContacts();
  // const index = data.findIndex(({ id }) => contactId === id);
  // if (index === -1) {
  //   return res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: "Not found",
  //   });
  // }
  await service.removeOne(contactId);
  res.json({
    status: "success",
    code: 204,
    message: "contact deleted",
  });
};

module.exports = removeOne;
