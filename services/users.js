const { User } = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};

const addOne = ({ email, password, avatarUrl, verifyToken }) => {
  const newUser = new User({ email, avatarUrl, verifyToken });
  newUser.setPassword(password);
  return newUser.save();
};

const updateOne = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  getOne,
  getById,
  addOne,
  updateOne,
};
