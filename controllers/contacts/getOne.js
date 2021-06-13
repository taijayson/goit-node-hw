const { contact: service } = require("../../services");

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.getOne(contactId);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getOne;
