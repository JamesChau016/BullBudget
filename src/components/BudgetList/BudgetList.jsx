import React, { useState } from 'react'
import styles from './BudgetList.module.css'

// BudgetBox takes budget as an object


const BudgetBox = ({ budget }) => {
    return (
        <div
            className = {styles['budget-box']}
            role="listitem"
            aria-label={`Budget ${budget.name}`}>
            <h3 className = {styles['budget-name']}>{budget.name}</h3>
            <div className = {styles['budget-balance']}>${budget.balance.toLocaleString()}</div>
        </div>
    )
}

const BudgetList = ({ budgets, setBudgets }) => {
    

    const [pendingName, setPendingName] = useState('');

    const handleChangeNameInput = (e) => {
        setPendingName(e.target.value)
    }

    const handleAddBudget = (e) => {
        e.preventDefault();
        const name = pendingName.trim();
        if (name === '') return;

        // prevent exact duplicate names (case-insensitive)
        const exists = budgets.some(b => b.name.toLowerCase() === name.toLowerCase());
        if (exists) {
            setPendingName('');
            return;
        }

        const newBudget = { name, balance: 0 };
        setBudgets(prev => [...prev, newBudget]);
        setPendingName('');
    }

    return (
        <>
            <div
                className = {`${styles.container}`}
            >
                <h2
                    className = {`${styles.heading}`}
                >
                    Your Budgets
                </h2>
                <form className = {styles['add-budget-form']} onSubmit = {handleAddBudget} aria-label="Add budget">
                    <input
                        type = "text"
                        className = {styles['add-budget-field']}
                        placeholder = "New budget name"
                        value = {pendingName}
                        onChange = {handleChangeNameInput}
                        aria-label="Budget name"
                    />
                    <button
                        type = "submit"
                        className = {styles['add-budget-button']}
                        aria-label="Add budget"
                    >
                        Add
                    </button>
                </form>
                <div className = {styles['budget-box-container']} role="list">
                    {budgets.map((budget, idx) => (
                        <BudgetBox key={`${budget.name}-${idx}`} budget = {budget} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BudgetList