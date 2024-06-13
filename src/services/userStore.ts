import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '@/services/firebase';

type Income = {
    title: string;
    value: string;
    date: string;
    comment: string;
    type:string;
};

type LoggedUserData = {
    avatar: string;
    nome: string;
    email: string;
    incomes: Income[];
    expenses: Income[];
};

type UserStore = {
    currentUser: LoggedUserData | null;
    isLoading: boolean;
    fetchUserData: (uid: string) => Promise<void>;
    deleteIncome: (uid: string, income: Income) => Promise<void>;
    deleteExpense: (uid: string, income: Income) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    isLoading:false,
    fetchUserData: async (uid: string) => {
        set({ isLoading: true });
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                set({ currentUser: userDoc.data() as LoggedUserData, isLoading: false });
            } else {
                console.log('Usuário não encontrado');
                set({ isLoading: false });
            }
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
        }
    },
    deleteIncome: async (uid: string, incomeToDelete: Income) => {
        set({ isLoading: true });
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data() as LoggedUserData;
                const updatedIncomes = userData.incomes.filter(
                    income => !(income.title === incomeToDelete.title && income.value === incomeToDelete.value && income.date === incomeToDelete.date && income.comment === incomeToDelete.comment && income.type === incomeToDelete.type)
                );
                await updateDoc(userDocRef, { incomes: updatedIncomes });
                set({ currentUser: { ...userData, incomes: updatedIncomes }, isLoading: false });
            } else {
                console.log('Usuário não encontrado');
                set({ isLoading: false });
            }
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
        }finally {
            set({ isLoading: false });
        }
    },
    deleteExpense: async (uid: string, expenseToDelete: Income) => {
        set({ isLoading: true });
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data() as LoggedUserData;
                const updatedIncomes = userData.expenses.filter(
                    expense => !(expense.title === expenseToDelete.title && expense.value === expenseToDelete.value && expense.date === expenseToDelete.date && expense.comment === expenseToDelete.comment && expense.type === expenseToDelete.type)
                );
                await updateDoc(userDocRef, { expenses: updatedIncomes });
                set({ currentUser: { ...userData, expenses: updatedIncomes }, isLoading: false });
            } else {
                console.log('Usuário não encontrado');
                set({ isLoading: false });
            }
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
        }finally {
            set({ isLoading: false });
        }
    },
}));
