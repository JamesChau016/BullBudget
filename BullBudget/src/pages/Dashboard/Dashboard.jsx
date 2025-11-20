import React, { useState } from 'react';

import styles from './Dashboard.module.css';

const Dashboard = ({ budgets, setBudgets }) => {
   
  const totalBalance = budgets.reduce((sum, jar) => sum + jar.balance, 0);

  return (
    <div className={styles.dashboardContainer}>
      { (
        <> 
          {}
          <header className={styles.dashboardHeader}>
            <div className={styles.totalSummary}>
              <h2>Total Balance</h2>
              <span className={styles.totalAmount}>${totalBalance.toLocaleString()}</span>
            </div>
            
          </header>

          {}
          <main className={styles.dashboardGrid}>
            
            {}
            <div className={styles.leftColumn}>
              
              {}
              {}
              <div className={`${styles.card} ${styles.boxPlaceholder}`}>
                <h3>Placeholder</h3>
                <p style={{color: '#888'}}>(Placeholder)</p>
              </div>

              {}
              <div className={`${styles.card} ${styles.boxTransactions}`}>
                <h3>Transaction History</h3>
                <div className={styles.transactionList}>
                   <div className={styles.transactionItem}><span>Transaction 1</span> <span>-$50</span></div>
                   <div className={styles.transactionItem}><span>Transaction 2</span> <span>-$20</span></div>
                   <div className={styles.transactionItem}><span>Transaction 3</span> <span>-$100</span></div>
                </div>
              </div>
            </div>

            {}
            <div className={styles.rightColumn}>
              
              {}
              <div className={`${styles.card} ${styles.boxStats}`}>
                <h3>Stats</h3>
                <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#eee', borderRadius: '50%', width: '150px', height: '150px', margin: '0 auto', lineHeight: '150px'}}>
                  Pie Chart
                </div>
                
                <ul style={{marginTop: '30px', paddingLeft: '20px'}}>
                    {budgets.map(b => (
                        <li key={b.id} style={{marginBottom: '10px'}}>
                          <strong>{b.name}</strong>: ${b.balance}
                        </li>
                    ))}
                 </ul>
              </div>
            </div>

          </main>
        </>
      )}
    </div>
  );
};

export default Dashboard;