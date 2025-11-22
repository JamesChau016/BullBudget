import { 
    doc, 
    getDoc
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useBudget = () => {

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

    return {
        getBudget
    };
};

export default useBudget;