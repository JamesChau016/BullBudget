import React,{ useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Jars.module.css'

function Jars() {
  const [jarNames, setJarNames] = useState(['BullBucks', 'Dining Dollars', 'School Fees', 'Personal Expenses', 'Saving', 'Necessities' ]);
  const [expandedJar, setExpandedJar] = useState(null);
  const [jarColors, setJarColors] = useState(['hsla(0, 0%, 93%, 1.00)', 'hsla(0, 0%, 93%, 1.00)', 'hsla(0, 0%, 93%, 1)', 'hsla(0, 0%, 93%,1)', 'hsla(0, 0%, 93%, 1)', 'hsla(0, 0%, 93%, 1)']);
  const jarNum= jarNames.length;
  const listJars = jarNames;

  function addJar(){
    const jarName = document.getElementById('add-jars').value;
    if ((!jarNames.includes(jarName)) && jarName.trim() !== ""){
      setJarNames([...jarNames, jarName]);
      toast.success(`Jar "${jarName}" added`);
    }
    else{
      toast.error('Please fill in a Jar name!');
    }
  }

  function removeJar(){
    if ((expandedJar !== null)&& (jarNames.length > 1)){
      const jarN = jarNames[expandedJar];
      const temp = jarNames.filter((_, index) => index !== expandedJar);
      setJarNames(temp);
      toast.success(`Jar "${jarN}" removed`);
      setExpandedJar(null);
    }
    else{
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
        {listJars.map((jarName, index) => (
          <div 
            onClick={() => expandedJar === null && expandJar(index)} 
            key={index} 
            className={`${styles.jar} ${expandedJar === index ? styles.expanded : ''}`}
            style={{backgroundColor: jarColors[index]}}
          >
            <h2 id={styles['jar-label']}>{jarName}</h2>
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