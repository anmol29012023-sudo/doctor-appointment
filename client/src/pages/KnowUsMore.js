import React from 'react';
import '../style/knowUsMore.css';

const KnowUsMore = () => {
  return (
    <div className="know-container">
      <h1 className="know-title">Know Us More</h1>
      <section className="section">
        <h2>About the Application</h2>
        <p>
          Our Healthcare Appointment System is a modern web-based platform designed to simplify and enhance the process of booking and managing medical appointments. Whether you're a patient seeking prompt medical help or a doctor aiming for organized scheduling, this platform serves as a bridge to efficient and streamlined healthcare services.
        </p>
      </section>

      <section className="section">
        <h2>Key Features</h2>
        <ul>
          <li>🚑 Book appointments with doctors across multiple specialties</li>
          <li>🎥 Online video consultation with integrated payment gateway</li>
          <li>📅 Calendar-based appointment management</li>
          <li>📄 Detailed doctor profiles with photos, experience & timings</li>
          <li>📦 Medicine inventory and billing management</li>
          <li>📨 Email notifications and confirmations</li>
          <li>🔐 Secure login, including Google Sign-In</li>
        </ul>
      </section>

      <section className="section">
        <h2>Why Use Our Platform?</h2>
        <p>
          Traditional appointment systems can be slow and disorganized. Our solution leverages the power of technology to offer:
        </p>
        <ul>
          <li>✅ 24/7 accessibility</li>
          <li>✅ Real-time availability of doctors</li>
          <li>✅ Paperless management</li>
          <li>✅ User-friendly and mobile-responsive interface</li>
        </ul>
      </section>

      <section className="section">
        <h2>For Patients</h2>
        <p>
          Easily book appointments, view your health history, reschedule visits, and make payments — all in one place. Get matched with the best available specialists.
        </p>
      </section>

      <section className="section">
        <h2>For Doctors</h2>
        <p>
          Manage your schedule, view patient records, and conduct online consultations. Get automated reminders and organized patient flows.
        </p>
      </section>

      <section className="section">
        <h2>Future Plans</h2>
        <ul>
          <li>🩺 Integration with wearable devices (for live health monitoring)</li>
          <li>🧠 AI-based disease prediction and diagnosis support</li>
          <li>📊 Advanced analytics for doctors and hospital admins</li>
          <li>📱 Mobile app launch for Android and iOS</li>
        </ul>
      </section>

      <footer className="footer">
        <p>Built with ❤️ to empower healthcare with technology.</p>
      </footer>
    </div>
  );
};

export default KnowUsMore;
