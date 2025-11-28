import React from 'react'
import styles from './TransactionHistory.module.css'
import dashboardStyles from '../Dashboard.module.css'
import { useBudget } from '../../../backend/useBudget.jsx'

const TransactionHistory = () => {
  const { budgets } = useBudget();

  // Collect all transactions from all budgets
  const allTransactions = budgets
    .flatMap(budget => 
      (budget.transactionList || []).map(transaction => ({
        ...transaction,
        budgetName: budget.name,
        budgetId: budget.id
      }))
    )
    .sort((a, b) => {
      // Sort by date, most recent first
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    })
    .slice(0, 10); // Show only the 10 most recent transactions

  return (
    <>
      <div
        className = {`${dashboardStyles['section-card']} ${styles['transaction-history']}`}
      >
        <h2
          className = {styles['transaction-history-heading']}
        >
          Transaction History
        </h2>
        <div
          className = {styles['transaction-list']}
        >
          {allTransactions.length === 0 ? (
            <div className={styles['empty-state']}>
              <p>No recent transactions</p>
              <p className={styles['empty-hint']}>
                Start adding transactions to your budgets!
              </p>
            </div>
          ) : (
            allTransactions.map((transaction) => (
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
                  <div className={styles['transaction-budget']}>
                    {transaction.budgetName}
                  </div>
                  <div className={styles['transaction-date']}>
                    {transaction.date ? new Date(transaction.date).toLocaleDateString() : ''}
                  </div>
                </div>
                <div className={styles['transaction-amount']}>
                  {transaction.type === 'add' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default TransactionHistory