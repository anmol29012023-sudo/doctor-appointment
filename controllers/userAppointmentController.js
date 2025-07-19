const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Get all appointments for the logged-in user
const getAppointmentsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await Appointment.find({ userId })
      .populate('doctor', 'firstname lastname specialization image time add_details');

    res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully',
      appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete an appointment
const deleteAppointmentById = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update appointment date
const updateAppointmentDate = async (req, res) => {
  try {
    const { newDate } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date: newDate },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Appointment rescheduled', updated });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getAppointmentsByUser,
  deleteAppointmentById,
  updateAppointmentDate
};
