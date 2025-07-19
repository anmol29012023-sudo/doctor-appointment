const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const bookAppointmentController = async (req, res) => {
  try {
    const {
      userID,
      firstname,
      lastname,
      email,
      phone,
      age,
      gender,
      time,
      disease,
      symptoms,
      date,
      doctorId,
      paymentMode,
      discount,
      serviceCharge,
      totalAmount
    } = req.body;

    const userId = req.body.userID;

    const selectedDoctor = await Doctor.findById(doctorId);

    if (!selectedDoctor) {
      return res.status(404).send({
        success: false,
        message: 'Doctor not found',
      });
    }

    const appointment = new Appointment({
      userId: req.userId,
      doctor: selectedDoctor._id,
      firstname,
      lastname,
      email,
      phone,
      age,
      gender,
      time,
      disease,
      symptoms,
      date,
      paymentMode,
      discount,
      serviceCharge,
      totalAmount
    });

    await appointment.save();

    res.status(201).send({
      success: true,
      message: 'Appointment booked successfully',
      appointment,
      doctor: selectedDoctor,
    });
  } catch (error) {
    console.error('Appointment error:', error);
    res.status(500).send({
      success: false,
      message: 'Server error during booking',
    });
  }
};

module.exports = { bookAppointmentController };
