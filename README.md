# 🏥 Smart Healthcare Appointment Booking System with Video Consultation

A full-stack **MERN (MongoDB, Express, React, Node.js)** web application that enables users to book appointments with doctors, make payments, and join video consultations. The system also supports appointment rescheduling, doctor management, and real-time communication using modern technologies.

---

## 🚀 Features

- 🔐 **User & Doctor Authentication** (Login/Signup)
- 🩺 **Book Appointments** with Specialization Filtering
- 📅 **Reschedule Appointments** with Date-Picker (Past dates disabled)
- 📹 **Secure Video Consultations** (Available only at scheduled time)
- 🎟️ **Promo Code Discounts**
- 📤 **Contact Us** form with Backend Storage
- 📁 **Admin/Doctor Dashboard** for Management

---

## 🛠️ Tech Stack

| Technology     | Description                    |
|----------------|--------------------------------|
| React          | Frontend UI                    |
| Node.js        | Backend server                 |
| Express.js     | API routing                    |
| MongoDB        | Database                       |
| Mongoose       | ODM for MongoDB                |
| JWT            | User authentication            |
| Jitsi Meet     | Video call integration         |
| CSS            | Styling and responsive layout  |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/anmol29012023-sudo/doctor-appointment.git
cd healthcare-appointment-system
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

✅ Create a `.env` file inside the `/backend` folder with the following:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/yourdbname
JWT_KEY=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

Then start the backend server:

```bash
npm start
```

---

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 🗃️ MongoDB Collections

- `users` (patients & doctors)
- `appointments`
- `contacts`
- `messages` *(optional, if chatbot is added)*

---

## 📚 Folder Structure

```
/frontend
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   └── style/
  └── public/

/backend
  ├── models/
  ├── routes/
  ├── controllers/
  └── utils/
```

---

## 🔐 Authentication

- Secure **JWT-based Login** for Patients and Doctors
- Middleware validates tokens from the `Authorization` header
- Token expiry logic for enhanced security

---

## 📆 Appointment Logic

- Past dates are disabled in calendar input
- Doctors filtered based on specialization
- Confirmation email sent after successful payment
- Video Call button enabled only at the scheduled appointment time

---

## 🧪 Testing

- Manual React UI Testing
- API Testing using **Postman**
- Mongoose Schema Validation

---

## 🧠 Future Enhancements

- 💬 Chatbot for real-time patient support (NLP-based)
- 📈 Analytics Dashboard for Admin
- 🧾 PDF Generation of appointment history
- 🔔 Real-time Notifications via WebSockets

---

## 🙌 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
