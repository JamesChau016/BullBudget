<<<<<<< HEAD
import { useEffect, useState } from 'react'
import {Toaster} from 'react-hot-toast'
import './App.css'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import Jars from './pages/Jars/Jars'
import { initialBudgets } from './Data/budgetData'
import { Route, Routes, useNavigate } from 'react-router-dom'
import BudgetList from './components/BudgetList/BudgetList'

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
        <BudgetList
          budgets = {budgets}
          setBudgets = {setBudgets}
        ></BudgetList>
        <Jars
          budgets = {budgets}
          setBudgets = {setBudgets}
        ></Jars>
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
=======
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

  
>>>>>>> f248131e226f1820f2194e3ce37ad01389ee2505
}

export default App
