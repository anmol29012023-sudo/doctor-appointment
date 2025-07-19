import React, { useEffect, useState,useCallback} from 'react';
import axios from 'axios';
import '../style/myAppointments.css';


const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const token = localStorage.getItem('token');
  

   const fetchAppointments = useCallback(async () => {
  try {
    const res = await axios.get('/api/v1/appointment/my', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const fetched = res?.data?.appointments || [];
    setAppointments(fetched);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    setAppointments([]);
  } finally {
    setLoading(false);
  }
}, [token]); 


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/appointment/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Appointment deleted');
      fetchAppointments();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete appointment');
    }
  };

  const handleReschedule = (id) => {
    setRescheduleId(id);
  };

  const handleConfirmReschedule = async () => {
    try {

      await axios.put(`/api/v1/appointment/${rescheduleId}`, {
        newDate: selectedDate.toISOString().split('T')[0]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRescheduleId(null);
      fetchAppointments();
      alert('Appointment rescheduled');
    } catch (err) {
      console.error('Reschedule error:', err);
      alert('Failed to reschedule appointment');
    }
  };

  const isJoinableNow = (appointmentDate, timeStr) => {
    if (!appointmentDate || !timeStr) return false;

    const now = new Date();
    const [startTime] = timeStr.split('-').map(str => str.trim());

    const [year, month, day] = appointmentDate.split('-').map(Number);
    const [hour, minute] = startTime.split(':').map(Number);

    const appointmentTime = new Date(year, month - 1, day, hour, minute);
    const diff = Math.abs(now - appointmentTime);

    return diff <= 5 * 60 * 1000;
  };

  
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>
      {Array.isArray(appointments) && appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id} className="appointment-card">
            <div className="card-section">
              <h3>{appt.doctor?.firstname} {appt.doctor?.lastname}</h3>
              <p><strong>Specialization:</strong> {appt.doctor?.specialization}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Payment:</strong> ₹{appt.totalAmount}</p>
            </div>
            <div className="card-section">
              <p><strong>Patient:</strong> {appt.firstname} {appt.lastname}</p>
              <p><strong>Email:</strong> {appt.email}</p>
              <p><strong>Phone:</strong> {appt.phone}</p>
              <p><strong>Symptoms:</strong> {appt.symptoms}</p>
            </div>
            <div className="card-actions">
              {rescheduleId === appt._id ? (
                <>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                  <button onClick={handleConfirmReschedule}>Confirm</button>
                  <button onClick={() => setRescheduleId(null)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleReschedule(appt._id)}>Reschedule</button>
              )}
              <button onClick={() => handleDelete(appt._id)} className="delete-btn">Delete</button>

              {isJoinableNow(appt.date, appt.time) ? (
                <button
                  className="join-btn"
                  onClick={() => window.open(`https://meet.jit.si/${appt._id}`, "_blank")}
                >
                  Join Video Call
                </button>
              ) : (
                <button className="join-btn-disabled" disabled>
                  Join Video Call (Disabled)
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;

