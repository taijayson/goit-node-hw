const { contact: service } = require("../../services");

const removeOne = async (req, res, next) => {
  const { contactId } = req.params;
  await service.removeOne(contactId);
  res.json({
    status: "success",
    code: 204,
    message: "contact deleted",
  });
};

module.exports = removeOne;
