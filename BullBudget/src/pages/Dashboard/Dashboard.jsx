import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

// Lọ placeholder
const Jar = ({ name, balance }) => {
  const maxCapacity = 5000;
  const waterHeightPercent = Math.min((balance / maxCapacity) * 100, 100);
  const waterStyle = { height: `${waterHeightPercent}%` };

  return (
    <div className={styles.jar}>
      <div className={styles['jar-lid']}></div>
      <div className={styles['jar-body']}>
        <div className={styles.water} style={waterStyle}></div>
      </div>
      <div className={styles['jar-info']}>
        <span className={styles['jar-name']}>{name}</span>
        <span className={styles['jar-balance']}>${balance}</span>
      </div>
    </div>
  );
}

// Dashboard tổng
const Dashboard = () => {
  const [budgets, setBudgets] = useState([ 
    { id: 1, name: 'BullBucks', balance: 150 },
    { id: 2, name: 'Dining Dollars', balance: 150 },
    { id: 3, name: 'Tuition Fee', balance: 5000 },
    { id: 4, name: 'Personal Expenses', balance: 250 },
    { id: 5, name: 'Transportation', balance: 0 },
  ]);

  const [isShelfOpen, setIsShelfOpen] = useState(false); 

  const totalBalance = budgets.reduce((sum, jar) => sum + jar.balance, 0);

  const handleAddJar = () => {
    alert("Later dev");
  };
  
  return (
    <div className={styles['dashboard-container']}>

      {!isShelfOpen ? (
        
        <div className={styles['welcome-screen']}>
          <h2>Let's manage your budget</h2>
          <button 
            className={styles['add-jar-btn']} 
            onClick={() => setIsShelfOpen(true)} 
          >
            Manage your Budget
          </button>
        </div>

      ) : (
        
        <> 
          <header className={styles['dashboard-header']}>
            <div className={styles['total-summary']}>
              <h2>Balance</h2>
              <span className={styles['total-amount']}>${totalBalance.toLocaleString()}</span>
            </div>
            <button className={styles['add-jar-btn']} onClick={handleAddJar}>
              + Add Jar
            </button>
          </header>

          <main className={styles['shelf-grid']}>
            {budgets.map((item) => (
              <Jar 
                key={item.id} 
                name={item.name} 
                balance={item.balance} 
              />
            ))}
          </main>
        </>
      )}

    </div>
  );
};

export default Dashboard;