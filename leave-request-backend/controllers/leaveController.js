const leaveService = require('../services/leaveService');

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getAllLeaves();
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeaveById = async (req, res) => {
  try {
    const leave = await leaveService.getLeaveById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    res.status(200).json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyLeave = async (req, res) => {
  try {
    await leaveService.createLeave(req.body);
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    await leaveService.updateLeave(req.params.id, req.body);
    res.status(200).json({ message: 'Leave updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    await leaveService.deleteLeave(req.params.id);
    res.status(200).json({ message: 'Leave deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveLeave = async (req, res) => {
  try {
    await leaveService.approveLeave(req.params.id);
    res.status(200).json({ message: 'Leave approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectLeave = async (req, res) => {
  try {
    await leaveService.rejectLeave(req.params.id);
    res.status(200).json({ message: 'Leave rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLeavesByUserId = async (req, res) => {
  try {
    const leaves = await leaveService.getLeavesByUserId(req.params.userId);
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
