
 import React,{ useState, useEffect } from 'react';
import '../style/layout.css';
import { Link, useNavigate } from 'react-router-dom';
import '../style/sidenav.css';


const LayoutHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');               
  };

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/v1/user/getUserData', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // required even if body is unused
      });

      const data = await res.json();
      if (data.success) setUser(data.data);
    } catch (err) {
      console.error('Error fetching user', err);
    }
  };
  fetchUser();
}, []);
   

  return (
    <>
      {/* Sidebar triggered by User */}
      <div className="sidenav" style={{ width: isSidebarOpen ? '250px' : '0' }}>
        <span className="closebtn" onClick={toggleSidebar}>&times;</span>
        <span className='span1' onClick={() => setIsProfileOpen(true)}>Profile</span>
        <Link to="/Settings">Settings</Link>
        <Link to="/AddDoctor">Add Doctor</Link>
         <span className='span1' onClick={handleLogout}>Logout</span>
      </div>

      {isProfileOpen && (
        <div className="profile-modal">
          <div className="profile-content">
            <span className="close-btn" style={{cursor:'default'}} onClick={() => setIsProfileOpen(false)}>&times;</span>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
             <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
             <p><strong>Role:</strong>User</p>
           </div>
        </div>
      )}

      <header className="header">
        <h2><img src="https://t4.ftcdn.net/jpg/00/90/93/05/360_F_90930570_1Q0aaTDlXs0xAM6lYNOrwpI7rPBB25su.jpg"
          alt="User Logo" className="app-logo-1"/>HealthCare</h2>
        <nav className="nav">
          <div><Link to='/' className='link'>Home</Link></div>
          <div>
            <Link to='/DoctorList' className='link'>Doctors</Link></div>
          <div><Link to ='/MyAppointments' className='link'>Appointments</Link></div>
          <div><Link to ='/ContactUs'className='link'>Contact</Link></div>
          <div onClick={toggleSidebar} style={{ cursor: 'pointer' }}><img
          src="https://t4.ftcdn.net/jpg/12/49/12/63/360_F_1249126338_leS5yTD2NdGuTra86mGyq9heEAxLbX5O.jpg"
          alt="User Logo" className="app-logo-1"/>
        </div>
        </nav>
      </header>
   
      <div id="main" style={{ marginRight:isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.5s' }}>
      <section className="hero">
        <div className="hero-text">
          <h2>Your Health Is Our Priority</h2>
          <p>
            Book appointments with certified doctors in seconds. Experience seamless
            healthcare solutions right from your home.
          </p>
         <div className='sec' >
          <div className="cta">
          <Link to="/BookAppointment">
          <button>Book an Appointment</button>
          </Link> 
          </div>
          <div className="knowmore">
            <Link to='/KnowUsMore'>
          <button>Know More About Us</button></Link>
          </div>
         </div>
        </div>
        <img
          src="https://krishnalabs.com/images/banner-doctors.png"
          alt="Doctor Illustration"
        />
      </section>

      <section className="features">
        <div className="feature">
         <img
          src="https://cdn-icons-png.flaticon.com/256/4422/4422996.png"
          alt="User Logo" className="app-logo"/>
          <h3>Qualified Doctors</h3>
          <p>Connect with verified and experienced medical professionals.</p>
        </div>
        <div className="feature">
          <img
          src="https://thumbs.dreamstime.com/b/digital-health-record-healthcare-innovation-color-icon-vector-illustration-sign-isolated-symbol-367876300.jpg"
          alt="User Logo" className="app-logo"/>
          <h3>Easy Scheduling</h3>
          <p>Book appointments with a few clicks at your convenience.</p>
        </div>
        <div className="feature">
          <img
          src="https://cdn-icons-png.flaticon.com/512/7067/7067372.png"
          alt="User Logo" className="app-logo"/>
          <h3>Online Consultation</h3>
          <p>Video calls and chat support for remote medical advice.</p>
        </div>
        </section>

      <section className="features">
        <div className="feature">
          <img
          src="https://cdn-icons-png.flaticon.com/512/12104/12104849.png"
          alt="User Logo" className="app-logo"/>
          <h3>Medical Records</h3>
          <p>Securely store and access your health reports and history online.</p>
        </div>
        <div className="feature">
          <img
          src="https://cdn-icons-png.flaticon.com/512/4003/4003759.png"
          alt="User Logo" className="app-logo"/>
          <h3>Prescription Access</h3>
          <p>View and download prescriptions from your doctors anytime.</p>
        </div>
        <div className="feature">
          <img
          src="https://cdn-icons-png.flaticon.com/512/650/650969.png"
          alt="User Logo" className="app-logo"/>
          <h3>24/7 Support</h3>
          <p>Our helpdesk is available round-the-clock for your needs.</p>
        </div>
      </section>

      <footer>
        &copy; 2025 HealthCare. All rights reserved.
      </footer>
      </div>
    </>
  );
};

export default LayoutHome;


