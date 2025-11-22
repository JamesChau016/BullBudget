import React,{ useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Jars.module.css'
import { useNavigate } from 'react-router-dom'
import { setCurrentScreen } from 'firebase/analytics'

//từ đây đổi tên thành component để chứa các Budgets


//sửa một vài tham số để đồng bộ với App.jsx với Dashboard.jsx
function Jars({ budgets, setBudgets }) {
  const navigate = useNavigate()

  // Sửa JarName thành budgets
  function addJar() {
    const jarName = document.getElementById('add-jars-input').value;
    const nameExists = budgets.some(b => b.name === jarName);
    
    if (!nameExists && jarName.trim() !== "") {
      setBudgets([...budgets, { 
        id: Date.now(), 
        name: jarName, 
        currentBalance: 0 
      }]);
      toast.success(`Jar "${jarName}" added`);
      document.getElementById('add-jars-input').value = '';
    } else {
      toast.error('Please fill in a unique Jar name!');
    }
  }

 return (
  <>
    <div className={styles['jars-header']}>
      <h2 className={styles['jars-title']}>YOUR BUDGETS</h2>
      <div className={styles['add-jar-form']}>
        <input 
          type='text' 
          id='add-jars-input' 
          placeholder='New budget name' 
          required
        />
        <button onClick={addJar} className={styles['add-jar-button']}>Add</button>
      </div>
    </div>
    
    <div className={styles['jars-container']}>
      {budgets.map((budget, index) => (
        <div 
          onClick={() => navigate(`/budget/${budget.name}`)}  
          key={budget.id}
          className={styles.jar}
        >
          <h2 className={styles['jar-label']}>{budget.name}</h2>
          <p className={styles['jar-balance']}>${budget.currentBalance.toLocaleString()}</p>
        </div>
      ))}
    </div>
  </>
)
}

export default Jars