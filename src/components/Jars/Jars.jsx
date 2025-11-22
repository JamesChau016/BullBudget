import React,{ useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Jars.module.css'
import { useNavigate } from 'react-router-dom'

//từ đây đổi tên thành component để chứa các Budgets


//sửa một vài tham số để đồng bộ với App.jsx với Dashboard.jsx
function Jars({ budgets, setBudgets }) {
  const navigate = useNavigate()
  const [expandedJar, setExpandedJar] = useState(null);
  const [jarColors, setJarColors] = useState(
    budgets.map(() => 'hsla(0, 0%, 93%, 1.00)'));
  const jarNum= budgets.length;
  // xóa dòng const listJars = budgets;

  // Sửa JarName thành budgets
  function addJar() {
    const jarName = document.getElementById('add-jars-input').value;
    const nameExists = budgets.some(b => b.name === jarName);
    
    if (!nameExists && jarName.trim() !== "") {
      setBudgets([...budgets, { 
        id: Date.now(), 
        name: jarName, 
        balance: 0 
      }]);
      toast.success(`Jar "${jarName}" added`);
      document.getElementById('add-jars-input').value = '';
    } else {
      toast.error('Please fill in a unique Jar name!');
    }
  }

// Update để dùng budgets array
  function removeJar() {
    if (expandedJar !== null && budgets.length > 1) {
      const jarN = budgets[expandedJar].name;
      setBudgets(budgets.filter((_, index) => index !== expandedJar));
      toast.success(`Jar "${jarN}" removed`);
      setExpandedJar(null);
    } else {
      toast.error('You must have at least one jar!');
    }
  }

  function expandJar(index){
    setExpandedJar(expandedJar === index ? null : index);
  }

  function changeJarColor(index){
    const newColor= document.getElementById('jar-color-picker').value;
    const updatedColors = [...jarColors];
    updatedColors[index] = newColor;
    setJarColors(updatedColors);
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
          style={{backgroundColor: jarColors[index]}}
        >
          <h2 id={styles['jar-label']}>{budget.name}</h2>
          <p className={styles['jar-balance']}>${budget.balance.toLocaleString()}</p>
        </div>
      ))}
    </div>
  </>
)
}

export default Jars