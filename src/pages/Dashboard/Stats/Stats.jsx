import React from 'react'
import styles from './Stats.module.css'
import dashboardStyles from '../Dashboard.module.css'

const Stats = ({ budgets, setBudgets }) => {

  const totalBalance = budgets.reduce((sum, jar) => sum + jar.currentBalance, 0);
  const numBudgets = budgets.length;
  const avgBalance = numBudgets > 0 ? Math.round(totalBalance / numBudgets) : 0;

  return (
    <>
      <div
        className = {`${dashboardStyles['section-card']} ${styles.stats}`}
      >
        <h2
          className = {styles['stats-heading']}
        >
          OVERALL STATS
        </h2>
        <div
          className = {styles['stats-content']}
        >
          <p
            className = {styles['stat-item']}
          >
            Total Balance: <span className = {styles['stat-value']}>${totalBalance.toLocaleString()}</span>
          </p>
          <div className={styles['metrics-grid']}>
            <div className={styles.metric}>
              <span className={styles['metric-icon']}>📊</span>
              <span className={styles['metric-value']}>{numBudgets}</span>
              <span className={styles['metric-label']}>Budgets</span>
            </div>
            <div className={styles.metric}>
              <span className={styles['metric-icon']}>💰</span>
              <span className={styles['metric-value']}>${avgBalance.toLocaleString()}</span>
              <span className={styles['metric-label']}>Average</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stats