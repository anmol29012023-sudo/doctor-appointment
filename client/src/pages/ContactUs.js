import React, { useState } from 'react';
import axios from 'axios';
import '../style/contactus.css';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Your message has been submitted successfully!");

     try {
      const res = await axios.post('/api/v1/user/send', form);
      if (res.data.success) {
        setSuccess('Message sent successfully!');
        setError('');
        setForm({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Failed to send message. Please try again.');
      setSuccess('');
    }


  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-desc">
        Have questions, feedback, or concerns? We're here to help. Fill out the form and our team will get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Subject</label>
        <input type="text" name="subject" value={form.subject} onChange={handleChange} required />

        <label>Message</label>
        <textarea name="message" rows="6" value={form.message} onChange={handleChange} required></textarea>

        <button type="submit">Submit</button>
      </form>
      {success && <p className="success-message" style={{justifyContent:'center'}}>{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ContactUs;
