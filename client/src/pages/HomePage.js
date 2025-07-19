import React ,{useEffect} from 'react';
//import '../style/HomePage.css';
import axios from 'axios';
import LayoutHome from '../components/LayoutHome';

const HomePage = () => {
 
const getUserData = async()=>{
  try {
    const res = await axios.post('/api/v1/user/getUserData',{},{
      headers:{
        Authorization:"Bearer" + localStorage.getItem('token')
      }}
  )
  console.log(res.data);
  } catch (error) {
    console.log(error);
 }
}
useEffect(()=>{
  getUserData();
}, [])
return (
  <LayoutHome>
     <h1>HOME PAGE</h1>
  </LayoutHome>
);
};

export default HomePage;
