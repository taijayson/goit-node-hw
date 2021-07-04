const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { users: services } = require("../../services");
const sendMail = require("../../utils");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await services.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        code: 400,
        message: "Missing some fields",
      });
    }
    const verifyToken = v4();
    await sendMail(email, verifyToken);
    const avatarUrl = gravatar.url(email).substr(2);
    const user = await services.addOne({
      email,
      password,
      avatarUrl,
      verifyToken,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfully added",
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
