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
import { auth } from "../../firebase/firebase.js";
import {signOut} from "firebase/auth";
import toast from 'react-hot-toast';
import ChatBox from '../../components/ChatBox/ChatBox.jsx';




const Dashboard = ({ budgets, setBudgets }) => {
  const navigate = useNavigate();

  const handleLogoutClicked = async () => {
    await signOut(auth);
    navigate('/');
    toast.success('Logout successful! See you next time.');
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
      <ChatBox />
    </>
  )
};

export default Dashboard;