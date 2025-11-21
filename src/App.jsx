import { useEffect, useState } from 'react'
import {ToastBar, Toaster} from 'react-hot-toast'
import './App.css'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
// import Jars from './pages/Jars/Jars'
import { initialBudgets } from './Data/budgetData'
import { Route, Routes, useNavigate } from 'react-router-dom'
import BudgetList from './components/BudgetList/BudgetList'
import { db } from './firebase/firebase.js'
import Login from './pages/Landing/AuthModal/Login/Login'
import AuthModal from './pages/Landing/AuthModal/AuthModal'
import BudgetDetail from './pages/BudgetDetail/BudgetDetail'

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
      <Route
        path="/budget/:budgetName"
        element={
          <BudgetDetail
            budgets={budgets}
            setBudgets={setBudgets}
          ></BudgetDetail>
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
      {/* <TestElement
        budgets = {budgets}
        setBudgets = {setBudgets}
      >
      </TestElement> */}
    </>
  )
}

export default App
