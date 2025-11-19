import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Toaster} from 'react-hot-toast'
import './App.css'
import Jars from './components/Jars.jsx'

function App() {
  return (
    <> 
      <Jars />
      <Toaster position="top-center" />
    </>
    
  )
}

export default App
