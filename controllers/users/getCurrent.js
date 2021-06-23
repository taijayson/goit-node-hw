const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users: services } = require("../../services");

const getCurrent = async (req, res, next) => {
  try {
    const { TOKEN_KEY } = process.env;
    const [, token] = req.headers.authorization.split(" ");
    const { id } = jwt.verify(token, TOKEN_KEY);
    req.user = await services.getById(id);
    res.json({
      status: "success",
      code: 200,
      data: req.user,
    });
    // next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = getCurrent;
