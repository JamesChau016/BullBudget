import { createContext, useContext, useState, useEffect } from 'react';
import { 
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    deleteDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUser } from "./user/useUser.jsx";

const BudgetContext = createContext(null);

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const { userId, signupComplete } = useUser();

    const getUserBudgets = async (userId) => {
        try {
            const budgetsQuery = query(
                collection(db, "budgets"), 
                where("ownerId", "==", userId)
            );
            
            const querySnapshot = await getDocs(budgetsQuery);
            const budgets = [];
            
            querySnapshot.forEach((doc) => {
                budgets.push(doc.data());
            });

            return { success: true, budgets };
        } catch (error) {
            console.error("Error getting user budgets:", error);
            return { success: false, error };
        }
    };

    const addBudget = async (budgetData) => {
        try {
            const budgetId = generateId();
            const newBudget = {
                id: budgetId,
                ownerId: budgetData.ownerId,
                type: budgetData.type || 'personal',
                name: budgetData.name,
                currentBalance: budgetData.currentBalance || 0,
                subBudgets: budgetData.subBudgets || [],
                transactionList: budgetData.transactionList || [],
                depth: budgetData.depth || 0,
                parentId: budgetData.parentId || '',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            await setDoc(doc(db, "budgets", budgetId), newBudget);
            
            // Update local state
            setBudgets(prev => [...prev, newBudget]);
            
            return { success: true, budget: newBudget };
        } catch (error) {
            console.error("Error creating budget:", error);
            return { success: false, error };
        }
    };

    const removeBudget = async (budgetId) => {
        try {
            // Delete from Firestore
            await deleteDoc(doc(db, "budgets", budgetId));
            
            // Update local state
            setBudgets(prev => prev.filter(b => b.id !== budgetId));
            
            return { success: true };
        } catch (error) {
            console.error("Error deleting budget:", error);
            return { success: false, error };
        }
    };

    const addTransaction = async (budgetId, transactionData) => {
        try {
            // Find the budget
            const budget = budgets.find(b => b.id === budgetId);
            if (!budget) {
                return { success: false, error: 'Budget not found' };
            }

            const amountNum = parseFloat(transactionData.amount);
            
            // Validate amount
            if (!transactionData.amount || isNaN(amountNum) || amountNum <= 0) {
                return { success: false, error: 'Please enter a valid amount' };
            }

            // Check sufficient balance for withdrawals
            if (transactionData.type === 'withdraw' && amountNum > budget.currentBalance) {
                return { success: false, error: 'Insufficient balance' };
            }

            // Create new transaction
            const newTransaction = {
                id: Date.now().toString(),
                type: transactionData.type, // 'add' or 'withdraw'
                amount: amountNum,
                budgetId: budgetId,
                budgetName: budget.name,
                description: transactionData.description || (transactionData.type === 'add' ? 'Deposit' : 'Withdrawal'),
                date: transactionData.date ? new Date(transactionData.date).toISOString() : new Date().toISOString(),
                repeat: transactionData.repeat || 'none'
            };

            // Update budget
            const existingTransactions = Array.isArray(budget.transactionList) ? budget.transactionList : [];
            const updatedBudget = {
                ...budget,
                currentBalance: transactionData.type === 'add' 
                    ? budget.currentBalance + amountNum 
                    : budget.currentBalance - amountNum,
                transactionList: [newTransaction, ...existingTransactions],
                updatedAt: new Date()
            };

            // Save to Firestore
            await setDoc(doc(db, "budgets", budgetId), updatedBudget);
            
            // Update local state
            setBudgets(prev => prev.map(b => 
                b.id === budgetId ? updatedBudget : b
            ));
            
            return { success: true, transaction: newTransaction, budget: updatedBudget };
        } catch (error) {
            console.error("Error adding transaction:", error);
            return { success: false, error };
        }
    };

    // Load budgets when userId changes
    useEffect(() => {
        if (!userId) {
            setBudgets([]);
            return;
        }

        // If user just signed up, wait for signup to complete before loading budgets
        if (signupComplete === false) {
            // Signup is in progress, budgets are being created
            // Wait for signupComplete to become true, then load
            const checkSignupComplete = setInterval(async () => {
                if (signupComplete === true) {
                    clearInterval(checkSignupComplete);
                    const result = await getUserBudgets(userId);
                    if (result.success) {
                        setBudgets(result.budgets);
                    }
                }
            }, 200); // Check every 200ms
            
            return () => clearInterval(checkSignupComplete);
        }

        // Normal load for existing users (signupComplete is null) or after signup completes (true)
        const loadBudgets = async () => {
            const result = await getUserBudgets(userId);
            if (result.success) {
                setBudgets(result.budgets);
            } else {
                setBudgets([]);
            }
        };

        loadBudgets();
    }, [userId, signupComplete]);

    const value = {
        budgets,
        setBudgets,
        getUserBudgets,
        addBudget,
        removeBudget,
        addTransaction,
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};