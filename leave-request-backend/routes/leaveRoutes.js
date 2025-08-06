const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const checkRole = require('../middleware/roleMiddleware');

router.get('/', leaveController.getAllLeaves);
router.get('/:id', leaveController.getLeaveById);
router.post('/', leaveController.applyLeave);
router.put('/:id', leaveController.updateLeave);
router.delete('/:id', leaveController.deleteLeave);
router.get('/user/:userId', leaveController.getLeavesByUserId);
//modify the middleware for role specifications and have the req body defined
//checkRole('admin'),
router.patch('/:id/approve',  leaveController.approveLeave);
//checkRole('admin'), 
router.patch('/:id/reject', leaveController.rejectLeave);

module.exports = router;
