import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './BudgetDetail.module.css'
import toast from 'react-hot-toast'
import Header from '../../components/Header/Header'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import { useBudget } from '../../backend/useBudget.jsx'

const BudgetDetail = () => {
  const { budgets, removeBudget, addTransaction } = useBudget(); // Get addTransaction
  const { budgetName } = useParams()
  const navigate = useNavigate()
  
  const budget = budgets.find(b => b.name === budgetName)
  
  // Add and withdraw form states
  const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState('add') 
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [repeat, setRepeat] = useState('none')
  
  // Transaction history is stored on the budget object so it's shared globally
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
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
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!budget || !budget.id) {
      toast.error('Budget not found');
      return;
    }

    const result = await removeBudget(budget.id);
    
    if (result.success) {
      toast.success(`Budget "${budgetName}" removed successfully`);
      setShowDeleteConfirm(false);
      navigate('/dashboard');
    } else {
      toast.error('Failed to delete budget');
      setShowDeleteConfirm(false);
    }
  }
  
  const handleTransaction = async (e) => {
    e.preventDefault()
    
    if (!budget || !budget.id) {
      toast.error('Budget not found');
      return;
    }

    const result = await addTransaction(budget.id, {
      type: transactionType,
      amount: amount,
      description: description,
      date: date,
      repeat: repeat
    });

    if (result.success) {
      // reset form
      setAmount('')
      setDescription('')
      setDate(new Date().toISOString().slice(0,10))
      setRepeat('none')
      
      toast.success(
        transactionType === 'add' 
          ? `Added $${result.transaction.amount} to ${budgetName}` 
          : `Withdrew $${result.transaction.amount} from ${budgetName}`
      )
    } else {
      toast.error(result.error || 'Failed to add transaction');
    }
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

              <div className={styles['form-group']}>
                <label className={styles['form-label']} htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className={styles['input-field']}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className={styles['form-group']}>
                <label className={styles['form-label']} htmlFor="repeat">
                  Repeat
                </label>
                <select
                  id="repeat"
                  className={styles['input-field']}
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
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
            
            {(!(budget.transactionList && budget.transactionList.length)) ? (
              <div className={styles['empty-state']}>
                <p>No transactions yet</p>
                <p className={styles['empty-hint']}>Add your first transaction to get started</p>
              </div>
            ) : (
              <div className={styles['transaction-list']}>
                {(budget.transactionList || []).map((transaction) => (
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
                        {transaction.date ? new Date(transaction.date).toLocaleDateString() : ''}
                      </div>
                      {transaction.repeat && transaction.repeat !== 'none' && (
                        <div className={styles['transaction-repeat']}>
                          {`Repeats: ${transaction.repeat.charAt(0).toUpperCase() + transaction.repeat.slice(1)}`}
                        </div>
                      )}
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

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Budget"
        message={`Are you sure you want to delete "${budgetName}" budget? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
      </div>
    </>
  )
}

export default BudgetDetail