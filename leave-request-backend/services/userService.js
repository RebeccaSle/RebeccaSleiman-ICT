const db = require('../models');
const User = db.User;

exports.getAllUsers = async () => {
  return await User.findAll();
};

exports.getUserById = async (id) => {
  return await User.findByPk(id);
};

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.updateUser = async (id, userData) => {
  return await User.update(userData, { where: { Id: id } });
};

exports.deleteUser = async (id) => {
  return await User.destroy({ where: { Id: id } });
};
