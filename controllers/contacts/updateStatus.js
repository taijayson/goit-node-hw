const { contact: service } = require("../../services");

const updateStatusForOne = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  try {
    const result = await service.updateStatusForOne(contactId, favorite);
    res.json({
      status: "success",
      code: 200,
      message: "Contact favorite status changed",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusForOne;