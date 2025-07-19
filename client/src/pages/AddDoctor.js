import React, { useState } from 'react';
import axios from 'axios';
import '../style/adddoctor.css';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    firstname: '',
      lastname:'',
      specialization: '',
      experience: '',
      contact: '',
      email: '',
      fees:'',
      timeFrom: '',
       timeTo: '',
      add_details:'',
      image: null
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("firstname", formData.firstname);
  data.append("lastname", formData.lastname);
  data.append("specialization", formData.specialization);
  data.append("experience", formData.experience);
  data.append("contact", formData.contact);
  data.append("email", formData.email);
  data.append("fees", formData.fees);
  data.append("timeFrom", formData.timeFrom);
  data.append("timeTo", formData.timeTo);
  data.append("add_details", formData.add_details);
  data.append("image", formData.image); 

  try {
    const res = await axios.post("/api/v1/doctor/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert(res.data.message);

   
    setFormData({
      firstname: '',
      lastname:'',
      specialization: '',
      experience: '',
      contact: '',
      email: '',
      fees:'',
      timeFrom: '',
       timeTo: '',
      add_details:'',
      image: null
    });

  } catch (error) {
    if (
      error.response &&
      error.response.status === 409 // or 400 based on backend logic
    ) {
      alert('Doctor already exists.');
    } else {
      alert(error.response?.data?.message || 'Error adding doctor');
    }
  }
};


  return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 ml-4 ">
        <h2 className="add_doc">APPLY AS DOCTOR</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{height:'600px'}}>
        <p className='details'>PERSONAL DETAILS:</p>
        <hr className='border-t-2'></hr>
        <div className ='block'>
        <div className='sub-block'> 
        <p className='text-xl font-bold mb-10  text-black-700'>FIRST NAME:</p>
        <input
          name="firstname"
          value={formData.firstname}
          placeholder="Doctor's Name"
          onChange={handleChange}
          className="w- p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        <div className='sub-block'> 
         <p className='text-xl font-bold mb-10  text-black-700'>LAST NAME:</p>
          <input
          name="lastname"
          value={formData.lastname}
          placeholder="Doctor's Name"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        <div className='sub-block'> 
        <p className='text-xl font-bold mb-10  text-black-700'>SPECIALIZATION:</p>        
        <select
        name="specialization"
        value={formData.specialization}
        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required>

        <option value="">Select Specialization</option>
        <option value="Cardiology">Heart Problem</option>
        <option value="Neurology">Headache / Brain</option>
        <option value="Dermatology">Skin Issue</option>
        <option value="Orthopedics">Bone Pain</option>
        <option value="Pediatrics">Child Illness</option>
        <option value="General Medicine">General Checkup</option>
        </select>
        </div>
        </div>

        <div className='block'>
        <div className='sub-block'> 
        <p className='text-xl font-bold mb-10  text-black-700'>EXPERIENCE:</p>
        <input
          name="experience"
          value={formData.experience}
          type="number"
          placeholder="Experience (in years)"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        <div className='sub-block'> 
         <p className='text-xl font-bold mb-10  text-black-700'>CONTACT-DETAILS:</p>
        <input
          name="contact"
          value={formData.contact}
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        <div className='sub-block'> 
         <p className='text-xl font-bold mb-10  text-black-700'>EMAIL:</p>
        <input
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        </div>
        <div className='block'>
        <div className='sub-block'> 
         <p className='text-xl font-bold mb-10  text-black-700'>FEES CHARGE:</p>
         <input
          name="fees"
          value={formData.fees}
          type="text"
          placeholder="Fees"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        <div className='sub-block'> 
         <p className='text-xl font-bold mb-10  text-black-700'>TIMMING:</p>
        <input
          name="timeFrom"
          value={formData.timeFrom}
          type="time"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        
        <input
          name="timeTo"
          value={formData.timeTo}
          type="time"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        <div className='sub-block'> 
         <p className='text-xl font-bold mb-10  text-black-700'>ADD DETAILS:</p>
        <input
          name="add_details"
          value={formData.add_details}
          placeholder="Message"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        </div>
        </div>

        <div className='block'> 
        <div className='sub-block' style={{margin:'0px 250px'}}>
        <p className="text-xl font-bold text-black mb-2">DOCTOR IMAGE:</p>
        <input
        type="file"
         name="image"
         accept="image/*"
         onChange={(e) =>
          setFormData({ ...formData, image: e.target.files[0] })
         }
         className="w-full p-2 border border-gray-300 rounded-lg"/>
        <button  className='butt'
          type="submit">
          Add Doctor
        </button>
        </div>
        </div>
    </form>
     </div>
  
  );
};

export default AddDoctor;



