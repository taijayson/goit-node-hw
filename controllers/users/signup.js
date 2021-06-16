const jwt = require("jsonwebtoken");
require("dotenv").config();

const { user: service } = require("../../services");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "User already register",
      });
    }
    const data = await service.addOne({ email, password });
    const { TOKEN_KEY } = process.env;
    const payload = {
      id: data.id,
    };
    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfully added",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
