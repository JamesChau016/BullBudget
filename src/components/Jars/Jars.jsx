import React, { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Jars.module.css'
import { useNavigate } from 'react-router-dom'
import { useBudget } from '../../backend/useBudget.jsx'

function Jars({ budgets, depth, onBudgetUpdate }) {
  const navigate = useNavigate()
  const { addBudget } = useBudget() 

  const addJar = async () => {
    const jarName = document.getElementById('add-jars-input').value.trim();
    const userId = getUserId(); // Now this will work
    
    if (!userId) {
      toast.error('You must be logged in to create a budget');
      return;
    }

    // Check if name already exists
    const nameExists = budgets.some(b => b.name === jarName);
    
    if (jarName === "") {
      toast.error('Please enter a budget name!');
      return;
    }

    if (nameExists) {
      toast.error('Budget name already exists!');
      return;
    }

  

    try {
      const result = await addBudget({
        ownerId: userId,
        name: jarName,
        currentBalance: 0,
        depth: depth + 1,
        // Other fields will use defaults:
        // type: 'personal'
        // subBudgets: []
        // transactionList: []
        // depth: 0
        // parentId: ''
      });

      if (result.success) {
        toast.success(`Budget "${jarName}" added successfully!`);
        document.getElementById('add-jars-input').value = '';
        
        // Refresh the budgets list
        if (onBudgetUpdate) {
          await onBudgetUpdate();
        }
      } else {
        toast.error('Failed to create budget');
      }
    } catch (error) {
      console.error('Error adding budget:', error);
      toast.error('Error creating budget');
    } finally {
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