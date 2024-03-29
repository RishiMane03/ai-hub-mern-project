import React, { useEffect, useState } from 'react';
import HomePage from '../Components/HomePage/homePage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

  const [isToken,setIsToken] = useState(false)
  const navigate = useNavigate()
  const BackendURL = process.env.REACT_APP_BACKEND_URL

  axios.defaults.withCredentials = true;

  async function dashboardApiCall(){
    try {
      const response = await axios.get(`${window.location.origin}/dashboards`);
      console.log(response.data.tokenVerify);
      setIsToken(response.data.tokenVerify)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    dashboardApiCall()
  })


  // Render HomePage only if JWT token exists
  return (
    <div>
      {isToken ? (
        <HomePage />
      ) : (
        <div style={{padding: '5rem'}}>
          <h1 style={{color: 'cadetblue', marginBottom: '1.5rem'}}>Please Login First</h1>
          <button className='aiBtn' onClick={()=>navigate('/login')}>Login Page</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
