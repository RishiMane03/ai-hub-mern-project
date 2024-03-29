import React, { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import flowerLogo2 from '../assets/flower-logo2.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './homePage.css'
import axios from 'axios';
import VariableContext from '../../Content/VariableContext';

// MUI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';


function HomePage() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  // MUI
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  axios.defaults.withCredentials = true;
  const [articles, setArticles] = useState([]);
  const { userInfo } = useContext(VariableContext);
  const navigate = useNavigate();

  // light lamp
  const [isActive, setIsActive] = useState(false); // State for button
  const [isLightOn, setIsLightOn] = useState(false); // State for light
  const [isAllSloganOn, setIsAllSloganOn] = useState(false); // State for allSlogan

  const toggleBtn = () => {
    setIsActive(prev => !prev); // Toggle isActive state
    setIsLightOn(prev => !prev); // Toggle isLightOn state
    setIsAllSloganOn(prev => !prev); // Toggle IsAllSloganOn state
  };

  const apiCall = async ()=>{
    try {
      const response = await axios.get(`${window.location.origin}/dashboards`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    apiCall()
  },[])


  const logoutFun = async () => {
    try {
      const response = await axios.get(`${window.location.origin}/logout`);
      console.log(response.data);
      if(response.data.logout){
        navigate('/login')
      }
    } catch (error) {
      console.error('Error or NoToken:', error);
      if(!error.response.data.isTokenPresent){
        alert('No token present')
        // navigate('/login')
      }
    }
  }

  return (
    <div className='HomePage'>
      <div className="hero">
        <nav className='dashboardNavBar'>
          <div className='logoNtitle'>
            <img onClick={()=>navigate('/')} src={flowerLogo2} style={{ width: '65px', height: '50px' }} alt="" className="logo" />
            <h1>AiHub</h1>
          </div>
          <ul className='allLinks'>
            <NavLink to='/summary'>Summary</NavLink>
            <NavLink to='/getcode'>Code</NavLink>
            <NavLink to='/chat'>Chat</NavLink>
            <NavLink to='/pdf'>PDF</NavLink>
            <NavLink to='/image'>Image</NavLink>
            <div className='logoutBtn' onClick={logoutFun}>
              <i class="fa-solid fa-right-from-bracket fa-2xl"></i>
            </div>
          </ul>

          <div className='menuBtnDiv'>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className = 'menuBtn'
            >
              Menu
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={()=>navigate('/summary')}>Summary</MenuItem>
              <MenuItem onClick={()=>navigate('/getcode')}>Code</MenuItem>
              <MenuItem onClick={()=>navigate('/chat')}>Chat</MenuItem>
              <MenuItem onClick={()=>navigate('/pdf')}>PDF</MenuItem>
              <MenuItem onClick={logoutFun}>Logout</MenuItem>
            </Menu>
          </div>
        </nav>
        
        <section className='lampNtext'>
          <div className="lamp-container">
            <img src="https://i.postimg.cc/yYz5Nnqw/lamp.png" alt="" className="lamp" />
            <img src="https://i.postimg.cc/SxgtDhXh/light.png" alt="" className={isLightOn ? 'light on' : 'light'} />
          </div>

          <div className="text-container">
            <div className='switchDiv'>
              <h3 className='shineLightSlogan'>Shine a <span>LIGHT</span> of hope <span>{userInfo}</span>. Click here</h3>
              <label className="toggle-switch">
                <input type="checkbox" checked={isActive} onChange={toggleBtn} />
                <span className="slider"></span>
              </label>
            </div>

            <div className={isAllSloganOn ? 'SloganOn' : 'SloganOff'}>
              <h1 className='ctrlSlogan'>We Make Ctrl+C and Ctrl+V <br /> <span>Seem Like Magic!</span></h1>
              <p onClick={()=>navigate('/pdf')}>PDFs are Like Onions: They Make You Cry, But We'll Help Dry Your Tears!</p>
              <p onClick={()=>navigate('/image')}>Instant Art: No Brushes or Talent Required!</p>
              <p onClick={()=>navigate('/summary')}>Summary Magic : Because Ain't Nobody Got Time for Full Paragraphs!</p>
              <p onClick={()=>navigate('/chat')}>Chatting with the AI: Because Therapy is Expensive!</p>
              <p onClick={()=>navigate('/getcode')}>Coding Made as Easy as Pie (or as complicated as quantum physics)!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage