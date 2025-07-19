import '../style/loginstyle.css';
import { Form, Input,message } from 'antd';
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const Login = () => {

  const navigate=useNavigate();
const dispatch= useDispatch();

  const Onfinishandler= async(values) =>{
    try {
      dispatch(showLoading())
      const res =await axios.post('/api/v1/user/login',values);
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem('token',res.data.token);
        message.success("login Successfully");
        navigate('/');
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
     <div className="form-c">
      <Form layout='vertical' onFinish={Onfinishandler}>
        <h1>LOGIN FORM</h1>
        <Form.Item label="E-mail" name="email">
        <Input type='email' required />
       </Form.Item>
        <Form.Item label="Password" name="password">
        <Input type='password' required />
       </Form.Item>
       <button className='btn btn-primary' type='submit'>Login</button>
       <Link to="/register" className='ms-3'>Not a User Try Register</Link>
      </Form>
     </div>
   </>
  )
}

export default Login


