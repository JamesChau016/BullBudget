import { createContext, useContext, useState, useEffect } from 'react';
import { 
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUser } from "./user/useUser.jsx";

const BudgetContext = createContext(null);

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const { userId, signupComplete } = useUser(); // Get signupComplete flag

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
    }, [userId, signupComplete]); // Add signupComplete to dependencies

    const value = {
        budgets,
        setBudgets,
        getUserBudgets,
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