import { createContext, useContext, useState, useEffect } from 'react';
import { 
    doc, 
    getDoc,
    collection,
    query,
    where,
    getDocs,
    setDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUser } from "./user/useUser";

const BudgetContext = createContext(null);

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const { userId } = useUser(); // Use userId directly instead of getUserId

    const getBudget = async (budgetId) => {
        try {
            const budgetDoc = await getDoc(doc(db, "budgets", budgetId));
            
            if (budgetDoc.exists()) {
                return { success: true, budget: budgetDoc.data() };
            } else {
                return { success: false, error: 'Budget not found' };
            }
        } catch (error) {
            console.error("Error getting budget:", error);
            return { success: false, error };
        }
    };

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

    const loadBudgets = async () => {
        const userId = getUserId();
        if (!userId) {
            setBudgets([]);
            return;
        }

        const result = await getUserBudgets(userId);
        if (result.success) {
            setBudgets(result.budgets);
        } else {
            console.error('Failed to load budgets:', result.error);
            setBudgets([]);
        }
    };

    const addBudget = async (budgetData) => {
        try {
            const budgetId = generateId();
            const newBudget = {
                id: budgetId,
                ownerId: budgetData.ownerId,
                type: 'personal',
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
            
            console.log("✅ Budget created successfully:", newBudget.name);
            return { success: true, budget: newBudget };
        } catch (error) {
            console.error("Error creating budget:", error);
            return { success: false, error };
        }
    };

    // Load budgets when userId changes
    useEffect(() => {
        if (userId) {
            loadBudgets();
        } else {
            setBudgets([]);
        }
    }, [userId]); // Use userId instead of getUserId()

    const value = {
        budgets,
        setBudgets,
        getBudget,
        getUserBudgets,
        addBudget,
        loadBudgets
    };

    console.log("Budgets:", budgets);

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};