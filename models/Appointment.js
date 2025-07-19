const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Set to true if linked to user auth
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: true, 
  },
  disease: {
  type: String,
  required: false
},
  symptoms: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['Card', 'UPI', 'NetBanking'],
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  serviceCharge: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;

 