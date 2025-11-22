import React from 'react'
import styles from './TransactionHistory.module.css'
import dashboardStyles from '../Dashboard.module.css'

const TransactionHistory = ({budgets, transactions }) => {
  const withdrawalTransactions = transactions.filter(t => t.type === 'withdraw');
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
          {withdrawalTransactions.length === 0 ? (
            <div className={styles['empty-state']}>
              <p>No recent transactions</p>
              <p className={styles['empty-hint']}>
                Start adding transactions to your budgets!
              </p>
            </div>
          ) : (
            withdrawalTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={styles['transaction-item']}
              >
                <div className={styles['transaction-info']}>
                  <div className={styles['transaction-budget']}>
                    {transaction.budgetName}
                  </div>
                  <div className={styles['transaction-description']}>
                    {transaction.description}
                  </div>
                  <div className={styles['transaction-date']}>
                    {transaction.date}
                  </div>
                </div>
                <div className={styles['transaction-amount']}>
                  -${transaction.amount.toFixed(2)}
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