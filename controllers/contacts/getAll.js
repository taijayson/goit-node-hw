const { contacts: services } = require("../../services");

const getAll = async (req, res, next) => {
  const { query } = req;
  // console.log(query);
  try {
    const result = await services.getAll(query);
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {}
};

module.exports = getAll;
