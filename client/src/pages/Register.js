import '../style/registerstyle.css';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { Link,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';

const Register = () => {

const navigate =useNavigate();
const dispatch=useDispatch();

  const Onfinishandler= async(values) =>{
    try {
       dispatch(showLoading())
      const res =await axios.post('/api/v1/user/register',values);
       dispatch(hideLoading())
      if(res.data.success){
        message.success("Register Successfully");
        navigate('/login');
       }
       else{
        message.error(res.data.message);
       }
    } catch (error) {
       dispatch(hideLoading())
      console.log(error);
      message.error('Something went Wrong');
    }
  
  };

  return (
   <>
    <div className="register-wrapper">
     <div className="form-container">
      <Form layout='vertical' onFinish={Onfinishandler}>
        <h1>REGISTER FORM</h1>
        <Form.Item label="Name" name="name">
        <Input type='text' required />
       </Form.Item>
        <Form.Item label="E-mail" name="email">
        <Input type='email' required />
       </Form.Item>
        <Form.Item label="Password" name="password">
        <Input type='password' required />
       </Form.Item>
       <button className='btn btn-primary' type='submit'>Submit</button>
       <Link to="/login" className='user'>Already User Try Login </Link>
      </Form>
     </div>
     </div>
   </>
  );
};


export default Register;