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
          (PlaceHolder)
        </div>
      </div>
    </>
  )
}

export default TransactionHistory