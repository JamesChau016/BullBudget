import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Welcome from './Welcome/Welcome';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import Stats from './Stats/Stats';
import BudgetList from '../../components/BudgetList/BudgetList';


const Dashboard = ({ budgets, setBudgets }) => {
  return (
    <>
      <main
        className = {styles.container}
      >
        <Welcome>
        </Welcome>
        <div
          className = {styles.overview}
        >
          <TransactionHistory>
          </TransactionHistory>
          <Stats
            budgets = {budgets}
            setBudgets = {setBudgets}
          >
          </Stats>
        </div>
        <BudgetList
          budgets = {budgets}
          setBudgets = {setBudgets}
        >
        </BudgetList>
      </main>
    </>
  )
};

export default Dashboard;