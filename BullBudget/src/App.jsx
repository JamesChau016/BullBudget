import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Toaster} from 'react-hot-toast'
import './App.css'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import Jars from './pages/Jars/Jars'

function App() {
  // State chung. We can work on this later
  const [budgets, setBudgets] = useState([
    { id: 1, name: 'BullBucks', balance: 150 },
    { id: 2, name: 'Dining Dollars', balance: 150 },
    { id: 3, name: 'Tuition Fee', balance: 5000 },
  ]);

  return (
    <>
      <Toaster />
      <div className='app-container'>
        <Dashboard budgets={budgets} setBudgets={setBudgets} />
        <Jars budgets={budgets} setBudgets={setBudgets} />
      </div>
    </>
  )
}

export default App
