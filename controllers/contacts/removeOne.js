const { contacts: services } = require("../../services");

const removeOne = async (req, res, next) => {
  const { contactId } = req.params;
  await services.removeOne(contactId);
  if (!contactId) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "missing id",
    });
  }
  res.json({
    status: "success",
    code: 204,
    message: "contact deleted",
  });
};

module.exports = removeOne;
