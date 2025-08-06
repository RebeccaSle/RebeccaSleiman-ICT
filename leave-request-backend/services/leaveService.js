const db = require('../models');
const Leave = db.Leave;

exports.getAllLeaves = async () => {
  return await Leave.findAll();
};

exports.getLeaveById = async (id) => {
  return await Leave.findByPk(id);
};

exports.createLeave = async (leaveData) => {
  return await Leave.create(leaveData);
};

exports.updateLeave = async (id, leaveData) => {
  return await Leave.update(leaveData, { where: { Id: id } });
};

exports.deleteLeave = async (id) => {
  return await Leave.destroy({ where: { Id: id } });
};

exports.approveLeave = async (id) => {
  return await Leave.update({ Status: 'Approved' }, { where: { Id: id } });
};

exports.rejectLeave = async (id) => {
  return await Leave.update({ Status: 'Rejected' }, { where: { Id: id } });
};

exports.getLeavesByUserId = async (userId) => {
  return await Leave.findAll({ where: { UserId: userId } });
};
