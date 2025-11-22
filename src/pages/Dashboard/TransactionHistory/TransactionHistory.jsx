import React from 'react'
import styles from './TransactionHistory.module.css'
import dashboardStyles from '../Dashboard.module.css'

const TransactionHistory = ({ }) => {
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
          <div className={styles['empty-state']}>
            <p>No recent transactions</p>
            <p className={styles['empty-hint']}>
              Start adding transactions to your budgets!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionHistory