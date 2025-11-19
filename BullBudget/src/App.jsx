import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Toaster} from 'react-hot-toast'
import './App.css'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import { Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }
  , []);

  return (
    <>
      <div
        className = 'app-container'
      >
        <Routes>
          <Route path = "/" element = {<Landing/>}/>
          <Route path = "/dashboard" element = {<Dashboard></Dashboard>}/>
        </Routes>
      </div>  
    </>
    
  )
}

export default App
