'use server';

import { db } from "@/services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

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

export async function deleteIncome(uid: string, incomeToDelete: Income) {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const userData = userDoc.data() as LoggedUserData;
            const updatedIncomes = userData.incomes.filter(
                income => !(income.title === incomeToDelete.title && income.value === incomeToDelete.value && income.date === incomeToDelete.date && income.comment === incomeToDelete.comment && income.type === incomeToDelete.type)
            );
            await updateDoc(userDocRef, { incomes: updatedIncomes });
            console.log('deu certo');
        } else {
            console.log('Usuário não encontrado');
        }
    } catch (error) {
    }

    revalidatePath('/income');
}

export async function deleteExpenses(uid: string, expenseToDelete: Income) {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const userData = userDoc.data() as LoggedUserData;
            const updatedIncomes = userData.expenses.filter(
                expense => !(expense.title === expenseToDelete.title && expense.value === expenseToDelete.value && expense.date === expenseToDelete.date && expense.comment === expenseToDelete.comment && expense.type === expenseToDelete.type)
            );
            await updateDoc(userDocRef, { expenses: updatedIncomes });
        } else {
            console.log('Usuário não encontrado');
        }
    } catch (error) {
        console.log(error);
    }

    revalidatePath('/expenses');
}