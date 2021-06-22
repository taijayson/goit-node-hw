const jwt = require("jsonwebtoken");
require("dotenv").config();

const { users: services } = require("../../services");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await services.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "User already register",
      });
    }
    const user = await service.addOne({ email, password });
    // const { TOKEN_KEY } = process.env;
    // const payload = {
    //   id: data.id,
    // };
    // const token = jwt.sign(payload, TOKEN_KEY);
    // console.log(user.email);
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
