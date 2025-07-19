import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import '../style/book_appointment.css';

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname:'',
    email: '',
    phone: '',
    age:'',
    gender:'',
    time:'',
    symptoms:'',
    disease: '',
    doctor: '',
    date:'',
  });
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  

  const handleNext = () => {
    if (step === 1 && formData.firstname && formData.lastname && formData.email && formData.phone) {
      setStep(2);
    } else if (step === 2 && formData.disease) {
      // Fetch doctors for selected disease
      axios.get(`/api/v1/doctor/specialization/${formData.disease}`)
        .then(res => {
          setDoctors(res.data.data);
          setStep(3);
        })
        .catch(err => console.log(err));
    }
  };

  const handleBook = () => {
  navigate('/Payment', {
    state: {
       doctor: formData.doctor,
            appointmentData: formData, 
    }
    });
};

  return (
    <div className="form-container">
      <h2 className='head'>Book an Appointment</h2>
      <p className='personal'>PERSONAL DETAILS:</p>
      <hr className='border-t-2'></hr>

      {step === 1 && (
        <>
          <div className='box'> 
        <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>FIRST NAME:</p>
          <input className='text'  type="text" placeholder="Name" value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} /><br />
         </div>
        <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>LAST NAME:</p>
           <input className='text' type="text" placeholder="Name" value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} /><br />  
        </div>
        <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>EMAIL:</p>
          <input className='email' type="email" placeholder="Email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} /><br />
            </div>
            </div>
            <div className='box'> 
            <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>PHONE NUMBER:</p>
          <input className='text' type="text" placeholder="Phone" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /><br />
            </div>
            <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>AGE:</p>
             <input className='text' type="text" placeholder="Age" value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })} /><br />
            </div>
            <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>GENDER:</p>
            <input className='text' type="text" placeholder="Gender" value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /><br />
            </div>
            </div>

          <button className='but' onClick={handleNext}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
        <div className='box'> 
        <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>DISEASE:</p>
          <select  className='option' value={formData.disease}
            onChange={(e) => setFormData({ ...formData, disease: e.target.value })}>
            <option value="">Select Disease</option>
            <option value="Cardiology">Heart Problem</option>
            <option value="Neurology">Headache / Brain</option>
            <option value="Dermatology">Skin Issue</option>
            <option value="Orthopedics">Bone Pain</option>
            <option value="Pediatrics">Child Illness</option>
            <option value="General Medicine">General Checkup</option>
          </select><br />
          </div>
          <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>SYMPTOMS:</p>
          <input  className='text' type="text" placeholder="Symptoms" value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })} /><br />
            </div>
            <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>DATE:</p>
            <input className='date' type="date" placeholder="Select Date" value={formData.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })} /><br />
            </div>
            <div className='subsection'> 
        <p className='text-xl font-bold mb-10  text-black-700'>TIME:</p>
            <input className='time' type="time" placeholder="Select Time" value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })} /><br />
            </div>
            </div>

          <button className='but' onClick={handleNext}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h4 className='heading'>Select Doctor</h4>
          {doctors.length === 0 ? (
  <p>No doctors found for this specialization.</p>
) : (
  doctors
    .filter((doc) => {
      // Only filter if patient time is selected
      if (!formData.time) return true;
      return doc.timeFrom <= formData.time && formData.time <= doc.timeTo;
    })
    .map((doc) => (
      <div key={doc.email} className="detail_list">
        <label className="doctor-label">
          <input
            type="radio"
            name="doctor"
            value={doc.email}
            onChange={() => setFormData({ ...formData, doctor: doc })}
          />
          <div className="details">
            <h3>{doc.firstname} {doc.lastname}</h3>
            <img
              src={`http://localhost:3000/${doc.image}`}
              alt={`${doc.firstname} ${doc.lastname}`}
              className="img_doc"
            /><br />
            <p>Specialization: {doc.specialization}</p>
            <p>Experience: {doc.experience} years</p>
            <p>{doc.add_details}</p><br />
            <p>Timing: {doc.timeFrom} - {doc.timeTo}</p><br />
          </div>
        </label>
      </div>
    ))
)}

          <button  className='but' onClick={handleBook} >Book Appointment</button>
          <br />
        </>
      )}
    </div>
  );
};

export default BookAppointment;
