const { contact: service } = require("../../services");

const addOne = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const data = { name, email, phone };
  // if (!data.name || !data.email || !data.phone) {
  //   return res.status(400).json({
  //     status: "error",
  //     code: 400,
  //     message: "Missing some fields",
  //   });
  // }
  try {
    const result = await service.addOne(data);
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
