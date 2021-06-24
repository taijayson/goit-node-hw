const { contacts: services } = require("../../services");

const getAll = async (req, res, next) => {
  const { query } = req;
  try {
    const result = await services.getAll(query);
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
