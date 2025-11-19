import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
    </>
  )
}

export default App
