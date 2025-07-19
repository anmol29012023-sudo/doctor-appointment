import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import BookAppointment from './pages/BookAppointment';
import AddDoctor from './pages/AddDoctor';
import Payment from './pages/Payment';
import DoctorList from './pages/DoctorList';
import MyAppointments from './pages/MyAppointments';
import KnowUsMore from './pages/KnowUsMore';
import ContactUs from './pages/ContactUs';
import Settings from './pages/Settings';


function App() { 
  const {loading} = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
    {loading && <Spinner/>}
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
          } />
          <Route path='/AddDoctor' element={
          <ProtectedRoute>
            <AddDoctor/>
          </ProtectedRoute>
          } />
          <Route
           path="/BookAppointment"
          element={
           <ProtectedRoute>
           <BookAppointment />
          </ProtectedRoute>
           }/>

           <Route
           path="/Payment"
          element={
           <ProtectedRoute>
           <Payment/>
          </ProtectedRoute>
           }/>
           <Route
           path="/Settings"
          element={
           <ProtectedRoute>
           <Settings/>
          </ProtectedRoute>
           }/>

            <Route
           path="/knowUsMore"
          element={
           <ProtectedRoute>
           <KnowUsMore/>
          </ProtectedRoute>
           }/>

            <Route
           path="/ContactUs"
          element={
           <ProtectedRoute>
           <ContactUs/>
          </ProtectedRoute>
           }/>

          <Route
           path="/DoctorList"
          element={
           <ProtectedRoute>
           <DoctorList />
          </ProtectedRoute>
           }/>

            <Route
           path="/MyAppointments"
          element={
           <ProtectedRoute>
           <MyAppointments />
          </ProtectedRoute>
           }/>

        <Route path='/login' element={
          <PublicRoute>
            <Login />
            </PublicRoute>} />
        <Route path='/register' element={
          <PublicRoute>
           <Register /> 
          </PublicRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
