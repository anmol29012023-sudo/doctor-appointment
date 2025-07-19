const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fees: {
    type: Number,
    required: true
  },
  timeFrom: {
  type: String,
  required: true
},
timeTo: {
  type: String,
  required: true
},
  image: {
    type: String, // Changed from imagePath → image for consistency with frontend
    required: true
  },
  add_details: {
    type:String,
    required:true
      } },
     { timestamps: true} 

);


module.exports = mongoose.model("Doctor", doctorSchema);
