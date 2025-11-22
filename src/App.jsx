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
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase.js'
import IncomeDetail from './pages/Income/IncomeDetail'

const NavigationWrapper = ({ budgets, setBudgets, user, income, setIncome, transactions, setTransactions }) => {
  const navigate = useNavigate();

  useEffect( () => {
    if (!user) {
      navigate("/");
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
            income={income}
            setIncome={setIncome}
            transactions={transactions}
            setTransactions={setTransactions}
          ></Dashboard>
        }
      ></Route>
      <Route
        path="/budget/:budgetName"
        element={
          <BudgetDetail
            budgets={budgets}
            setBudgets={setBudgets}
            transactions={transactions}
            setTransactions={setTransactions} 
          ></BudgetDetail>
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
  )
}

const TestElement = () => {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [transactions, setTransactions] = useState([]);
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
  const  [income, setIncome] = useState({ balance: 0, transactions: [] });
  const [transactions, setTransactions] = useState([]);

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
          income = {income}
          setIncome = {setIncome}
          user = {user}
          transactions = {transactions}
          setTransactions = {setTransactions}
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