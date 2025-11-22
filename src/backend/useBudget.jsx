import { createContext, useContext, useState, useEffect } from 'react';
import { 
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc
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