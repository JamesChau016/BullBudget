import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Stats.module.css'
import dashboardStyles from '../Dashboard.module.css'

const Stats = ({ budgets, income }) => {

  const budgetsTotal = budgets.reduce((sum, jar) => sum + jar.balance, 0);
  const numBudgets = budgets.length;
  
  // Safety check for income
  const incomeBalance = income?.balance || 0;
  const totalBalance = budgetsTotal + incomeBalance;
  
  // console.log('Stats - income balance:', incomeBalance); // Debug log

  const navigate = useNavigate();

  const handleIncomeClick = () => {
    navigate(`/income`)
  }

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
            <div
              className={styles['metric-income']}
              onClick={handleIncomeClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleIncomeClick() }}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles['metric-icon']}>💰</span>
              <span className={styles['metric-value']}>${incomeBalance.toLocaleString()}</span>
              <span className={styles['metric-label']}>Income</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stats