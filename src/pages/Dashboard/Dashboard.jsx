import React from 'react';
import styles from './Dashboard.module.css';
import Welcome from './Welcome/Welcome';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import Stats from './Stats/Stats';
import Header from '../../components/Header/Header';
import NavigationButton from '../../components/NavigationButton/NavigationButton.jsx';
import { useNavigate } from 'react-router-dom';
import Jars from '../../components/Jars/Jars';
import toast from 'react-hot-toast';
import ChatBox from '../../components/ChatBox/ChatBox.jsx';
import { useBudget } from '../../backend/useBudget.jsx'
import { useUser } from '../../backend/user/useUser.jsx' 

const Dashboard = ({ income, setIncome }) => {
  const navigate = useNavigate();
  const { user, signOut } = useUser(); // Get signOut from context
  const { budgets, setBudgets } = useBudget();

  const handleLogoutClicked = async () => {
    const result = await signOut(); // Use signOut from context
    if (result.success) {
      navigate('/'); // Navigate after successful logout
    }
  }

  return (
    <>
      <Header>
        <NavigationButton
          className={styles['navigation-button']}
          onClick={handleLogoutClicked}
        >            
          Logout
        </NavigationButton>
      </Header>
      <main className={styles.container}>
        <div className={styles.heroSection}>
          <Welcome />
          <Stats 
            budgets={budgets} 
            income={income} 
            setIncome={setIncome} 
          />
        </div>

        <div className={styles.mainContent}>
          <Jars budgets={budgets} setBudgets={setBudgets} />
          <TransactionHistory budgets={budgets} transactions={transactions} />
        </div>
      </main>
      <ChatBox />
    </>
  )
};

export default Dashboard