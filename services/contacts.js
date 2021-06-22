const { Contact } = require("../models");

const getAll = (query) => {
  return Contact.find(query);
};

const getOne = (id) => {
  return Contact.findById(id);
};

const addOne = (body) => {
  return Contact.create(body);
};

const updateOne = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const updateStatusForOne = (id, favorite) => {
  return Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

const removeOne = (id) => {
  return Contact.findByIdAndDelete(id);
};

const service = {
  getAll,
  getOne,
  addOne,
  updateOne,
  updateStatusForOne,
  removeOne,
};

module.exports = service;
