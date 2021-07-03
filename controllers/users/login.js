const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users: services } = require("../../services");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await services.getOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Invalid email or password",
      });
    }
    if (user.verify === false) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "Validation need",
      });
    }
    const payload = {
      id: user._id,
    };
    const { TOKEN_KEY } = process.env;
    const token = jwt.sign(payload, TOKEN_KEY);
    user.token = token;
    res.json({
      status: "success",
      code: 200,
      data: {
        token: user.token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      code: 400,
      message: "Missing some fields",
    });
    next(error);
  }
};

module.exports = login;
