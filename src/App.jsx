import React, { useEffect, useState } from 'react'
import {Toaster} from 'react-hot-toast'
import './App.css'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import Jars from './pages/Jars/Jars'
import { initialBudgets } from './Data/budgetData'
import { Route, Routes, useNavigate } from 'react-router-dom'
import BudgetList from './components/BudgetList/BudgetList'
import Login from './pages/Landing/AuthModal/Login/Login'
import AuthModal from './pages/Landing/AuthModal/AuthModal'
import {db} from './firebase/firebase.js';

const NavigationWrapper = ({ budgets, setBudgets }) => {
  const navigate = useNavigate();

  useEffect( () => {
    navigate("/");
  }, [])

  return (
    <Routes>
      <Route 
          path = "/" 
          element = {
            <Landing>  
            </Landing>
          }
      ></Route>
      <Route 
        path = "/dashboard" 
        element = {
          <Dashboard
            budgets = {budgets}
            setBudgets = {setBudgets}
          ></Dashboard>
        }
      ></Route>
    </Routes>
  )
}

const TestElement = () => {
  const [budgets, setBudgets] = useState(initialBudgets);
  return (
      <>
        <AuthModal></AuthModal>
      </>
  )
}

function App() {
  // State chung. We can work on this later
  const [budgets, setBudgets] = useState(initialBudgets);

  return (
    <>
      <NavigationWrapper
        budgets = {budgets}
        setBudgets = {setBudgets}
      >
      </NavigationWrapper>
      <Toaster/>
      {/* <TestElement
        budgets = {budgets}
        setBudgets = {setBudgets}
      >
      </TestElement> */}
    </>
  )
}

export default App
