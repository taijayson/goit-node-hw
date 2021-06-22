const { contacts: services } = require("../../services");

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await services.getOne(contactId);
  if (!contactId) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "missing id",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getOne;
