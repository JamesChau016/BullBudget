import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Toaster} from 'react-hot-toast'
import './App.css'
<<<<<<< HEAD
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <>
      <div
        className = 'app-container'
      >
        <Dashboard></Dashboard>
      </div>
=======
import Jars from './components/Jars.jsx'

function App() {
  return (
    <> 
      <Jars />
      <Toaster position="top-center" />
>>>>>>> d53afd6c16330d8aa62093f63a0120fa38b61202
    </>
    
  )
}

export default App
