import React from 'react'
import styles from './Stats.module.css'
import dashboardStyles from '../Dashboard.module.css'

const Stats = ({ budgets, setBudgets }) => {

  const totalBalance = budgets.reduce((sum, jar) => sum + jar.balance, 0);

  return (
    <>
      <div
        className = {`${dashboardStyles['section-card']} ${styles.stats}`}
      >
        <h2
          className = {styles['stats-heading']}
        >
          Stats
        </h2>
        <div
          className = {styles['stats-content']}
        >
          <p
            className = {styles['stat-item']}
          >
            Total Balance: <span className = {styles['stat-value']}>${totalBalance.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Stats