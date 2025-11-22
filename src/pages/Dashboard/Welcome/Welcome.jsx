import React from 'react'
import styles from './Welcome.module.css'

const Welcome = () => {
  const userName = 'User';
  return (
    <div className={styles.welcome}>
      <h1 className={styles['welcome-heading']}>
        Welcome, {userName}! 
      </h1>
      <p className={styles['welcome-subheading']}>
        Let's manage your budgets today!
      </p>
    </div>
  )
}

export default Welcome