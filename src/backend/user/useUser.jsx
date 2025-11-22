import { createContext, useContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut as firebaseSignOut
} from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase/firebase.js";
import toast from 'react-hot-toast';
import { initialBudgets } from '../budgetData.js';

const UserContext = createContext(null);

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Track initial auth state loading

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Get current user ID
    const getUserId = () => {
        if (user) {
            return user.uid;
        }
        return null;
    };

    // Derived userId for easier access
    const userId = user?.uid || null;

    const showAuthError = (error) => {
        if (error.code === 'auth/email-already-in-use') {
            toast.error('This email is already in use. Please log in instead.');
        } else if (error.code === 'auth/weak-password') {
            toast.error('Password is short (minimum 6 characters).');
        } else if (error.code === 'auth/user-not-found') {
            toast.error('No account found with this email. Please sign up.');
        } else if (error.code === 'auth/wrong-password') {
            toast.error('Incorrect password. Please try again.');
        } else if (error.code === 'auth/invalid-email') {
            toast.error('Invalid email address.');
        } else {
            toast.error('An error occurred. Please try again.');
        }
    };

    const createInitialBudgets = async (userId) => {
        try {
            console.log("💰 Creating initial budgets for user:", userId);
            
            for (const budget of initialBudgets) {
                const budgetId = generateId();
                const budgetData = {
                    id: budgetId,
                    ownerId: userId,
                    type: budget.type,
                    name: budget.name,
                    currentBalance: budget.currentBalance,
                    subBudgets: [],
                    transactionList: [],
                    depth: 0,
                    parentId: '',
                    createdAt: new Date()
                };
                
                await setDoc(doc(db, "budgets", budgetId), budgetData);
                console.log(`✅ Budget created: ${budget.name}`);
            }
            
            console.log("✅ All initial budgets created successfully");
            return true;
            
        } catch (error) {
            console.error("❌ Error creating initial budgets:", error);
            toast.error('Error creating initial budgets.');
            return false;
        }
    };
    
    const createUserDocument = async (newUser) => {
        try {
            await setDoc(doc(db, "users", newUser.uid), {
                id: newUser.uid,
                email: newUser.email,
                type: 'user',
                createdAt: new Date(),
            });
            
            console.log("User document created successfully");
            
            const budgetsCreated = await createInitialBudgets(newUser.uid);
            if (!budgetsCreated) {
                console.warn("User created but budgets failed");
            }
            
            return true;
        } catch (error) {
            console.error("Error creating user document:", error);
            toast.error('Error setting up user profile.');
            return false;
        }
    };

    const login = async (email, password) => {
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return { success: false };
        }

        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = userCredential.user;
            
            toast.success('Login successful! Welcome back.');
            return { success: true, user: loggedInUser };
        } catch (error) {
            showAuthError(error);
            setError(error);
            return { success: false, error };
        }
    };

    const signUp = async (email, password, passwordRe) => {
        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields');
            return { success: false };
        }
        else if (password !== passwordRe) {
            toast.error('Passwords do not match. Please try again.');
            return { success: false };
        }

        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            const newUserDoc = await createUserDocument(newUser);
            if (!newUserDoc) {
                return {
                    success: false, 
                    error: 'Failed to load the document',
                }
            }
            toast.success('Sign Up successful! Welcome to BullBudget.');
            return { success: true, user: userCredential.user };
        } catch (error) {
            showAuthError(error);
            setError(error);
            return { success: false, error };
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            toast.success('Logout successful! See you next time.');
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout. Please try again.');
            return { success: false, error };
        }
    };

    const value = {
        user,
        userId,
        getUserId,
        login,
        signUp,
        signOut,  // Export as signOut
        error,
        loading
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};