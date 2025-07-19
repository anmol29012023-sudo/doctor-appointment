const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  addDoctorController,
  getAllDoctorsController,
  getDoctorsBySpecialization
} = require('../controllers/doctorController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/add', upload.single('image'), addDoctorController);

// Create new doctor
router.post('/add', addDoctorController);

// Get all doctors
router.get('/all', getAllDoctorsController);

// Get doctors by specialization
router.get('/specialization/:specialization', getDoctorsBySpecialization);

module.exports = router;
