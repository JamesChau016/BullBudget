import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './IncomeDetail.module.css'
import Header from '../../components/Header/Header'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import toast from 'react-hot-toast'

const IncomeDetail = ({ income, setIncome }) => {
  const navigate = useNavigate()
  
  // Form states
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [repeat, setRepeat] = useState('none')

  // Safety check - initialize income if undefined using useEffect
  React.useEffect(() => {
    if (!income && setIncome) {
      setIncome({ balance: 0, transactions: [] })
    }
  }, [income, setIncome])

  const handleBack = () => navigate('/dashboard')
  
  // If setIncome is not provided, show error
  if (!setIncome) {
    console.error('IncomeDetail: setIncome prop is not provided')
    navigate('/dashboard')
    return null
  }
  
  // Return early if income hasn't been initialized yet
  if (!income) {
    return <div>Loading...</div>
  }

  const handleTransaction = (e) => {
    e.preventDefault()
    
    const amountNum = parseFloat(amount)
    
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    
    // Create new transaction (always adding to income)
    const newTransaction = {
      id: Date.now(),
      type: 'add',
      amount: amountNum,
      description: description || 'Income',
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      repeat: repeat || 'none'
    }

    const newIncome = {
      balance: income.balance + amountNum,
      transactions: [newTransaction, ...(income.transactions || [])]
    }

    // console.log('Updating income from', income.balance, 'to', newIncome.balance); // Debug log

    // Update income with new balance and transaction
    setIncome(newIncome)

    // Reset form
    setAmount('')
    setDescription('')
    setDate(new Date().toISOString().slice(0,10))
    setRepeat('none')
    
    toast.success(`Added ${amountNum} to Income`)
  }

  return (
    <>
      <Header>
        <NavigationButton onClick={handleBack}>Back</NavigationButton>
      </Header>

      <div className={styles.container}>
        <div className={styles['income-header']}>
          <h1 className={styles['income-name']}>Income</h1>
          <div className={styles['income-balance']}>
            <span className={styles['balance-label']}>Current Balance</span>
            <span className={styles['balance-amount']}>${income.balance.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.content}>
          {/* Transaction Form */}
          <div className={styles['form-section']}>
            <h2 className={styles['section-title']}>Add Income</h2>
            <form className={styles['transaction-form']} onSubmit={handleTransaction}>
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
                  placeholder="e.g., Salary, Freelance, etc."
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
                className={`${styles.btn} ${styles['btn-add']}`}
              >
                Add Income
              </button>
            </form>
          </div>

          {/* Transaction History */}
          <div className={styles['history-section']}>
            <h2 className={styles['section-title']}>Transaction History</h2>

            {(!(income.transactions && income.transactions.length)) ? (
              <div className={styles['empty-state']}>
                <p>No transactions yet</p>
                <p className={styles['empty-hint']}>Add your first income transaction to get started</p>
              </div>
            ) : (
              <div className={styles['transaction-list']}>
                {(income.transactions || []).map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`${styles['transaction-item']} ${styles['transaction-add']}`}
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
                      +${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles['back-button-container']}>
          <button 
            className={styles['back-button']} 
            onClick={handleBack}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  )
}

export default IncomeDetail