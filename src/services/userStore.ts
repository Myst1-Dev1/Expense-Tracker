import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { auth, db } from '@/services/firebase';
import { FormEvent } from 'react';

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
    handleAddExpenseToDataBase:(e:FormData | any) => Promise<void>;
    handleAddIncomeToDataBase:(e:FormData | any) => Promise<void>;
    deleteIncome: (uid: string, income: Income) => Promise<void>;
    deleteExpense: (uid: string, income: Income) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    isLoading: false,
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
    handleAddIncomeToDataBase: async(e:FormEvent | any) => {
        e.preventDefault();
        set({ isLoading: true });

        const formData = new FormData(e.target);
        const { title, value, date, comment } = Object.fromEntries(formData);

        const income = {
            title,
            value,
            date,
            comment,
            type:'income'
        };

        try {
            const userDocRef = doc(db, 'users', auth.currentUser!.uid);
            await updateDoc(userDocRef, {
                incomes: arrayUnion(income)
            });
        } catch (error) {
            console.error("Error updating document: ", error);
            set({ isLoading: false });
        } finally {
            set({ isLoading: false });
        }
    },
    handleAddExpenseToDataBase: async(e:FormEvent | any) => {
        e.preventDefault();
        set({ isLoading: true });

        const formData = new FormData(e.target);
        const { title, value, date, comment } = Object.fromEntries(formData);

        const expenses = {
            title,
            value,
            date,
            comment,
            type:'expense'
        };

        try {
            const userDocRef = doc(db, 'users', auth.currentUser!.uid);
            await updateDoc(userDocRef, {
                expenses: arrayUnion(expenses)
            });
        } catch (error) {
            console.error("Error updating document: ", error);
            set({ isLoading: false });
        } finally {
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
        }
    },
}));
