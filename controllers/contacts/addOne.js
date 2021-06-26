const { contacts: services } = require("../../services");

const addOne = async (req, res, next) => {
  try {
    const result = await services.addOne(req.body);
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "missing some fields",
      });
    }
    res.json({
      status: "Contact added",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addOne;
