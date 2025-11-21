import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Welcome from './Welcome/Welcome';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import Stats from './Stats/Stats';
import BudgetList from '../../components/BudgetList/BudgetList';
import Header from '../../components/Header/Header';
import NavigationButton from '../../components/NavigationButton/NavigationButton.jsx';





const Dashboard = ({ budgets, setBudgets }) => {
  const navigate = useNavigate();

  const handleLogoutClicked = () => {
    navigate('/');
  }
  return (
    <>
      <Header>
          <NavigationButton
            className = {`${styles['navigation-button']}`}
            onClick = {handleLogoutClicked}
          >            
            Logout
          </NavigationButton>
        </Header>
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