import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './BudgetDetail.module.css'
import toast from 'react-hot-toast'
import Header from '../../components/Header/Header'
import NavigationButton from '../../components/NavigationButton/NavigationButton'

const BudgetDetail = ({ budgets, setBudgets }) => {
  const { budgetName } = useParams()
  const navigate = useNavigate()
  
  const budget = budgets.find(b => b.name === budgetName)
  
  // Add and withdraw form states
  const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState('add') 
  const [description, setDescription] = useState('')
  
  // State cho transaction history 
  const [transactions, setTransactions] = useState([])
  
  if (!budget) {
    navigate('/dashboard')
    return null
  }

  const handleLogout = () => {
    navigate('/')
  }

  //Dashboard button
  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  // Remove jar của Huy
  const handleRemoveJar = () => {
    if (window.confirm(`Are you sure you want to delete "${budgetName}" budget?`)) {
      const updatedBudgets = budgets.filter(b => b.name !== budgetName)
      setBudgets(updatedBudgets)
      toast.success(`Budget "${budgetName}" removed successfully`)
      navigate('/dashboard')
    }
  }
  
  const handleTransaction = (e) => {
    e.preventDefault()
    
    const amountNum = parseFloat(amount)
    
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    
    if (transactionType === 'withdraw' && amountNum > budget.currentBalance) {
      toast.error('Insufficient balance')
      return
    }
    
    // Update balance
    const updatedBudgets = budgets.map(b => {
      if (b.name === budgetName) {
        return {
          ...b,
          currentBalance: transactionType === 'add' 
            ? b.currentBalance + amountNum 
            : b.currentBalance - amountNum
        }
      }
      return b
    })
    
    setBudgets(updatedBudgets)
    
    // Add to transaction history
    const newTransaction = {
      id: Date.now(),
      type: transactionType,
      amount: amountNum,
      description: description || (transactionType === 'add' ? 'Deposit' : 'Withdrawal'),
      date: new Date().toLocaleString()
    }
    
    setTransactions([newTransaction, ...transactions])
    
    setAmount('')
    setDescription('')
    
    toast.success(
      transactionType === 'add' 
        ? `Added $${amountNum} to ${budgetName}` 
        : `Withdrew $${amountNum} from ${budgetName}`
    )
  }
  
  return (
    <>
      <Header>
        <NavigationButton onClick={handleLogout}>
          Logout
        </NavigationButton>
      </Header>

      <div className={styles.container}>
        <div className={styles['budget-header']}>
          <h1 className={styles['budget-name']}>{budget.name}</h1>
          <div className={styles['budget-balance']}>
            <span className={styles['balance-label']}>Current Balance</span>
            <span className={styles['balance-amount']}>${budget.currentBalance.toLocaleString()}</span>
          </div>
        </div>
        
        <div className={styles.content}>
          {/* Transaction Form */}
          <div className={styles['form-section']}>
            <h2 className={styles['section-title']}>Add Transaction</h2>
            <form className={styles['transaction-form']} onSubmit={handleTransaction}>
              <div className={styles['form-group']}>
                <label className={styles['form-label']}>Transaction Type</label>
                <div className={styles['radio-group']}>
                  <label className={styles['radio-label']}>
                    <input
                      type="radio"
                      name="transactionType"
                      value="add"
                      checked={transactionType === 'add'}
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <span>Add Money</span>
                  </label>
                  <label className={styles['radio-label']}>
                    <input
                      type="radio"
                      name="transactionType"
                      value="withdraw"
                      checked={transactionType === 'withdraw'}
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <span>Withdraw Money</span>
                  </label>
                </div>
              </div>
              
              <div className={styles['form-group']}>
                <label className={styles['form-label']} htmlFor="amount">
                  Amount ($)
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  className={styles['input-field']}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className={styles['form-group']}>
                <label className={styles['form-label']} htmlFor="description">
                  Description (Optional)
                </label>
                <input
                  id="description"
                  type="text"
                  className={styles['input-field']}
                  placeholder="e.g., Lunch, Salary, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className={`${styles.btn} ${
                  transactionType === 'add' ? styles['btn-add'] : styles['btn-withdraw']
                }`}
              >
                {transactionType === 'add' ? 'Add Money' : 'Withdraw Money'}
              </button>
            </form>
          </div>
          
          {/* Transaction History */}
          <div className={styles['history-section']}>
            <h2 className={styles['section-title']}>Transaction History</h2>
            
            {transactions.length === 0 ? (
              <div className={styles['empty-state']}>
                <p>No transactions yet</p>
                <p className={styles['empty-hint']}>Add your first transaction to get started</p>
              </div>
            ) : (
              <div className={styles['transaction-list']}>
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`${styles['transaction-item']} ${
                      transaction.type === 'add' 
                        ? styles['transaction-add'] 
                        : styles['transaction-withdraw']
                    }`}
                  >
                    <div className={styles['transaction-info']}>
                      <div className={styles['transaction-description']}>
                        {transaction.description}
                      </div>
                      <div className={styles['transaction-date']}>
                        {transaction.date}
                      </div>
                    </div>
                    <div className={styles['transaction-amount']}>
                      {transaction.type === 'add' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      <div className={styles['back-button-container']}> {/* Back button container */}
        <button 
          className={styles['back-button']} 
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>
        <button
          className={styles['remove-button']}
          onClick={handleRemoveJar}
        >
          Remove Jar
        </button>
      </div>

      </div>
    </>
  )
}

export default BudgetDetail