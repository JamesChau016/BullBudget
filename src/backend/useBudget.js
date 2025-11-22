import { initialBudgets } from "./budgetData";
import { addDoc, collection } from "firebase/firestore";

const useBudget = () => {
    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

};
