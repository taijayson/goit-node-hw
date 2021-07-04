const { users: services } = require("../../services");

const verify = async (req, res, next) => {
  const { verifyToken } = req.params;
  try {
    const user = await services.getOne({ verifyToken });
    await services.updateOne(user._id, { verify: true, verifyToken: null });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      code: 404,
      message: "User not found",
    });
  }
};

module.exports = verify;
