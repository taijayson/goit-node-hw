require("dotenv").config();

const getCurrent = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = getCurrent;
