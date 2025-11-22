import React,{ useEffect, useState } from 'react'
import {ToastBar, Toaster} from 'react-hot-toast'
import './App.css'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import Jars from './components/Jars/Jars';
import { initialBudgets } from './Data/budgetData'
import { Route, Routes, useNavigate } from 'react-router-dom'
//import BudgetList from './components/BudgetList/BudgetList'
import { db } from './firebase/firebase.js'
import Login from './pages/Landing/AuthModal/Login/Login'
import AuthModal from './pages/Landing/AuthModal/AuthModal'
import BudgetDetail from './pages/BudgetDetail/BudgetDetail'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase.js'

const NavigationWrapper = ({ budgets, setBudgets, user }) => {
  const navigate = useNavigate();

  useEffect( () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/")
    }
  }, [user])

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <NavigationWrapper
          budgets = {budgets}
          setBudgets = {setBudgets}
          user = {user}
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
