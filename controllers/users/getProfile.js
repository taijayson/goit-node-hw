const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users: service } = require("../../services");

const getProfile = async (req, res, next) => {
  try {
    const { TOKEN_KEY } = process.env;
    const [, token] = req.headers.Authorization.split(" ");
    const { id } = jwt.verify(token, TOKEN_KEY);
    req.user = await service.getById(id);
    res.json({
      status: "success",
      code: 200,
      data: req.user,
    });
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = getProfile;
