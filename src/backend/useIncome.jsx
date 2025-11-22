import { createContext, useContext, useState, useEffect } from 'react';
import { 
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUser } from "./user/useUser.jsx";

const IncomeContext = createContext(null);

export const IncomeProvider = ({ children }) => {
    const [income, setIncome] = useState({ balance: 0, transactions: [] });
    const { userId, signupComplete } = useUser();

    const getUserIncome = async (userId) => {
        try {
            const incomeDoc = await getDoc(doc(db, "income", userId));
            
            if (incomeDoc.exists()) {
                return { success: true, income: incomeDoc.data() };
            } else {
                // Create default income document if it doesn't exist
                const defaultIncome = {
                    balance: 0,
                    transactions: [],
                    userId: userId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                await setDoc(doc(db, "income", userId), defaultIncome);
                return { success: true, income: defaultIncome };
            }
        } catch (error) {
            console.error("Error getting user income:", error);
            return { success: false, error };
        }
    };

    const addIncomeTransaction = async (transactionData) => {
        try {
            if (!userId) {
                return { success: false, error: 'User not logged in' };
            }

            const amountNum = parseFloat(transactionData.amount);
            
            // Validate amount
            if (!transactionData.amount || isNaN(amountNum) || amountNum <= 0) {
                return { success: false, error: 'Please enter a valid amount' };
            }

            // Create new transaction
            const newTransaction = {
                id: Date.now().toString(),
                type: 'add',
                amount: amountNum,
                description: transactionData.description || 'Income',
                date: transactionData.date ? new Date(transactionData.date).toISOString() : new Date().toISOString(),
                repeat: transactionData.repeat || 'none'
            };

            // Update income
            const existingTransactions = Array.isArray(income.transactions) ? income.transactions : [];
            const updatedIncome = {
                ...income,
                balance: income.balance + amountNum,
                transactions: [newTransaction, ...existingTransactions],
                updatedAt: new Date()
            };

            // Save to Firestore
            await setDoc(doc(db, "income", userId), updatedIncome);
            
            // Update local state
            setIncome(updatedIncome);
            
            return { success: true, transaction: newTransaction, income: updatedIncome };
        } catch (error) {
            console.error("Error adding income transaction:", error);
            return { success: false, error };
        }
    };

    // Load income when userId changes
    useEffect(() => {
        if (!userId) {
            setIncome({ balance: 0, transactions: [] });
            return;
        }

        // If user just signed up, wait for signup to complete before loading income
        if (signupComplete === false) {
            // Signup is in progress, wait for signupComplete to become true
            const checkSignupComplete = setInterval(async () => {
                if (signupComplete === true) {
                    clearInterval(checkSignupComplete);
                    const result = await getUserIncome(userId);
                    if (result.success) {
                        setIncome(result.income);
                    }
                }
            }, 200); // Check every 200ms
            
            return () => clearInterval(checkSignupComplete);
        }

        // Normal load for existing users (signupComplete is null) or after signup completes (true)
        const loadIncome = async () => {
            const result = await getUserIncome(userId);
            if (result.success) {
                setIncome(result.income);
            } else {
                setIncome({ balance: 0, transactions: [] });
            }
        };

        loadIncome();
    }, [userId, signupComplete]);

    const value = {
        income,
        setIncome,
        getUserIncome,
        addIncomeTransaction,
    };

    return (
        <IncomeContext.Provider value={value}>
            {children}
        </IncomeContext.Provider>
    );
};

export const useIncome = () => {
    const context = useContext(IncomeContext);
    if (!context) {
        throw Error('useIncome must be used within an IncomeProvider');
    }
    return context;
};
