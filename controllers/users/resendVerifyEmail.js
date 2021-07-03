const { users: services } = require("../../services");
const sendMail = require("../../utils");

const resend = async (req, res, next) => {
  const { email } = req.body;
  const user = await services.getOne({ email });
  try {
    if (!email) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "missing required field email",
      });
    }
    if (!user) {
      return res.status(404).json({
        status: "failed",
        code: 404,
        message: "User not found",
      });
    }
    if (user.verify === true) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Verification has already been passed",
      });
    }
    await sendMail(email, user.verifyToken);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resend;
