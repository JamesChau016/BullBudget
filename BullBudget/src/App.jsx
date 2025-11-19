import { useState } from 'react'
import {Toaster} from 'react-hot-toast'
import './App.css'
import Jars from './components/Jars.jsx'
import LoginPage from './components/Login.jsx'

function App() {

  const [loggedIn, setLoggedIn] = useState (false);


  if (!loggedIn) {
    return (
      <>
        <LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Toaster position="top-center" />
      </>
      
    )
  }
  else{
    return (
      <>
        <Jars />
        <Toaster position="top-center" />
      </>
    )
  }

  
}

export default App
