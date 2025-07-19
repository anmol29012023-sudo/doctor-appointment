const Doctor = require('../models/Doctor');

// Create a new doctor
const addDoctorController = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      specialization,
      experience,
      contact,
      email,
      fees,
      timeFrom,
      timeTo,
      add_details
    } = req.body;

    const existingDoctor = await Doctor.findOne({ email: req.body.email });

    if (existingDoctor) {
      return res.status(409).send({
        success: false,
        message: 'Doctor already exists with this email',
      });
    }
    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: 'Doctor image is required',
      });
    }
    const newDoctor = new Doctor({
      firstname,
      lastname,
      specialization,
      experience,
      contact,
      email,
      fees,
      add_details,
      timeFrom,
      timeTo,
      image: `/uploads/${req.file.filename}`,
    });
  
    await newDoctor.save();
    res.status(201).send({ success: true, message: 'Doctor added successfully', data: newDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error adding doctor', error: error.message });
  }
};


// Get all doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({ success: true, data: doctors });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error fetching doctors', error: error.message });
  }
};

// Find doctor by specialization
const getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    const doctors = await Doctor.find({ specialization });
    res.status(200).send({ success: true, data: doctors });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error fetching doctors by specialization', error: error.message });
  }
};


module.exports = {
  addDoctorController,
  getAllDoctorsController,
  getDoctorsBySpecialization
};
