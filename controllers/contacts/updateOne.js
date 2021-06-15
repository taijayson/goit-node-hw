const { contact: service } = require("../../services");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.updateOne(contactId, req.body);
    if (!contactId) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "missing id",
      });
    }
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
