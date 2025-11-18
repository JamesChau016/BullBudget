import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// Lọ placeholder
const Jar = ({ name, balance }) => {
  const maxCapacity = 5000;
  const waterHeightPercent = Math.min((balance / maxCapacity) * 100, 100);
  const waterStyle = { height: `${waterHeightPercent}%` };

  return (
    <div className="jar">
      <div className="jar-lid"></div>
      <div className="jar-body">
        <div className="water" style={waterStyle}></div>
      </div>
      <div className="jar-info">
        <span className="jar-name">{name}</span>
        <span className="jar-balance">${balance}</span>
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
    <div className="dashboard-container">

      {!isShelfOpen ? (
        
        <div className="welcome-screen">
          <h2>Let's manage your budget</h2>
          <button 
            className="add-jar-btn" 
            onClick={() => setIsShelfOpen(true)} 
          >
            Manage your Budget
          </button>
        </div>

      ) : (
        
        <> 
          <header className="dashboard-header">
            <div className="total-summary">
              <h2>Balance</h2>
              <span className="total-amount">${totalBalance.toLocaleString()}</span>
            </div>
            <button className="add-jar-btn" onClick={handleAddJar}>
              + Add Jar
            </button>
          </header>

          <main className="shelf-grid">
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