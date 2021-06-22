const { contacts: services } = require("../../services");

const updateStatusForOne = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  try {
    const result = await services.updateStatusForOne(contactId, favorite);
    if (favorite === undefined) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "missing field favorite",
      });
    }
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
