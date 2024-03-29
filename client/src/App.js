import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FirstPage from './Pages/FirstPage';
import LogIn from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Summary from './Components/Summary/summary';
import Code from './Components/Code/code';
import Chat from './Pages/Chat';
import Image from './Pages/Image';
import PdfSummary from './Components/PdfSummary/PdfSummary';
import VariableProvider from './Content/VaribleProvider'

function App() {
  return (
    <div>
      <VariableProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path='/' element={<FirstPage/>}/> 
            <Route path='/login' element={<LogIn/>}/> 
            <Route path='/dashboard' element={<Dashboard/>}/> 
            <Route path='/summary' element={<Summary/>}/> 
            <Route path='/getcode' element={<Code/>}/> 
            <Route path='/chat' element={<Chat/>}/> 
            <Route path='/pdf' element={<PdfSummary/>}/> 
            <Route path='/image' element={<Image/>}/> 
          </Routes>
        </Router>
      </VariableProvider>
    </div>
  );
}

export default App;
