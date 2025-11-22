import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Welcome from './Welcome/Welcome';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import Stats from './Stats/Stats';
//import BudgetList from '../../components/BudgetList/BudgetList';
import Header from '../../components/Header/Header';
import NavigationButton from '../../components/NavigationButton/NavigationButton.jsx';
import { useNavigate } from 'react-router-dom';
import Jars from '../../components/Jars/Jars';





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
        <div className={styles.heroSection}>
          <Welcome />
          <Stats budgets={budgets} setBudgets={setBudgets} />
        </div>

        <div className={styles.mainContent}>
          <Jars budgets={budgets} setBudgets={setBudgets} />
          <TransactionHistory budgets={budgets} />
        </div>
      </main>
    </>
  )
};

export default Dashboard;