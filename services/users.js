const { User } = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};

const addOne = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

const updateOne = (id, data) => {
  return User.findByIdAndUpdate(id, data);
};

module.exports = {
  getOne,
  getById,
  addOne,
  updateOne,
};
