import React, { useEffect, useState } from 'react'
import {ToastBar, Toaster} from 'react-hot-toast'
import './App.css'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import Jars from './components/Jars/Jars';
import { initialBudgets } from './backend/budgetData'
import { Route, Routes, useNavigate } from 'react-router-dom'
//import BudgetList from './components/BudgetList/BudgetList'
import { db } from './firebase/firebase.js'
import Login from './pages/Landing/AuthModal/Login/Login'
import AuthModal from './pages/Landing/AuthModal/AuthModal'
import BudgetDetail from './pages/BudgetDetail/BudgetDetail'
// Remove these imports - now handled by UserProvider
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './firebase/firebase.js'
import IncomeDetail from './pages/Income/IncomeDetail'
import { BudgetProvider } from './backend/useBudget.jsx'
import { UserProvider, useUser } from './backend/user/useUser.jsx' // Add this

const NavigationWrapper = ({ income, setIncome }) => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get user from context

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate])

  return (
    <BudgetProvider>
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
              income={income}
              setIncome={setIncome}
            ></Dashboard>
          }
        ></Route>
        <Route
          path="/budget/:budgetName"
          element={
            <BudgetDetail></BudgetDetail>
          }
        ></Route>
        <Route
          path="/income"
          element={
            <IncomeDetail
              income={income}
              setIncome={setIncome}
            ></IncomeDetail>
          }
        ></Route>
      </Routes>
    </BudgetProvider>
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
  // Remove budgets and user state - now in contexts
  const [income, setIncome] = useState({ balance: 0, transactions: [] });

  // Remove the onAuthStateChanged useEffect - now in UserProvider

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <UserProvider>
        <NavigationWrapper
          income={income}
          setIncome={setIncome}
        />
      </UserProvider>
      {/* <TestElement
        budgets = {budgets}
        setBudgets = {setBudgets}
      >
      </TestElement> */}
    </>
  )
}

export default App