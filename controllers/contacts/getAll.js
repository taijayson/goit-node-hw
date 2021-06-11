const { listContacts } = require("../../db/index");

const getAll = async (req, res, next) => {
  const result = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getAll;
