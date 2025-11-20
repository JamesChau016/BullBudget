import React,{ useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Jars.module.css'

//từ đây đổi tên thành component để chứa các Budgets


//sửa một vài tham số để đồng bộ với App.jsx với Dashboard.jsx
function Jars({ budgets, setBudgets }) {
  const [expandedJar, setExpandedJar] = useState(null);
  const [jarColors, setJarColors] = useState(
    budgets.map(() => 'hsla(0, 0%, 93%, 1.00)'));
  const jarNum= budgets.length;
  // xóa dòng const listJars = budgets;

  // Sửa JarName thành budgets
  function addJar() {
    const jarName = document.getElementById('add-jars').value;
    const nameExists = budgets.some(b => b.name === jarName);
    
    if (!nameExists && jarName.trim() !== "") {
      setBudgets([...budgets, { 
        id: Date.now(), 
        name: jarName, 
        balance: 0 
      }]);
      toast.success(`Jar "${jarName}" added`);
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
      <h1 id={styles['page-title']}>Your {jarNum} financial Jars</h1>
      <input type='text' id={styles['add-jars']} placeholder='New jar name' required/>
      <button onClick={addJar} id={styles['add-jar-button']}>Add Jar</button>
      <div className={styles['jars-container']}>
        {budgets.map((budget, index) => (
          <div 
            onClick={() => expandedJar === null && expandJar(index)} 
            key={budget.id}
            className={`${styles.jar} ${expandedJar === index ? styles.expanded : ''}`}
            style={{backgroundColor: jarColors[index]}}
          >
            <h2 id={styles['jar-label']}>{budget.name}</h2>

            {expandedJar === index && (
              <>
                <div className={styles['jar-color-controls']}>
                  <input type='color' id={styles['jar-color-picker']}  />
                  <button id={styles['change-jar-color']} onClick={() => changeJarColor(index)}>Change Color</button>
                </div>
                <div className={styles['jar-details']}>
                  <div className={styles['jar-details-buttons']}>
                    <button id={styles['close-jar']} onClick={(e) => {e.stopPropagation(); expandJar(index);}}>Close</button>
                    <button id={styles['remove-jar']} onClick={(e) => {e.stopPropagation(); removeJar();}}>Remove Jar</button>
                  </div>
                </div>
              </>
            )}
            
          </div>
        ))}
      </div>
    </>
  )
}

export default Jars