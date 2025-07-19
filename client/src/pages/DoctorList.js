import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/doctorlist.css';
import {useDispatch} from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
   const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
         dispatch(showLoading());
        const res = await axios.get('/api/v1/doctor/all');
        setDoctors(res.data.data);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="head">AVAILABLE DOCTORS</h2>
      <div className="main_body">
        {doctors.map((doc) => (
          <div key={doc._id} className="doc_detail">
            <img
              src={`http://localhost:3000/${doc.image}`} 
              alt={`${doc.firstname} ${doc.lastname}`}
              className='img_doc'
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-blue-700">{doc.firstname} {doc.lastname}</h3>
              <p className="text-gray-600">Specialization: {doc.specialization}</p>
              <p className="text-gray-600">Experience: {doc.experience} years</p>
              <p className="text-gray-600">Fees: ₹ {doc.fees}</p>
              <p className="text-gray-600">Available From: {doc.timeFrom}-{doc.timeTo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
