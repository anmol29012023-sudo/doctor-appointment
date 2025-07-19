// routes/appointmentRoutes.js
const express = require('express');
const { bookAppointmentController } = require('../controllers/appointmentController');
const authMiddleware = require('../Middlewares/authMiddleware');
const { getAppointmentsByUser, deleteAppointmentById, updateAppointmentDate } = require('../controllers/userAppointmentController');

const router = express.Router();

router.post('/book', authMiddleware, bookAppointmentController);
router.get('/my', authMiddleware, getAppointmentsByUser);         // GET appointments
router.delete('/:id', authMiddleware, deleteAppointmentById);     // DELETE by ID
router.put('/:id', authMiddleware, updateAppointmentDate); 


module.exports = router;
