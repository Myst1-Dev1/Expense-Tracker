'use server'

import { db } from "@/services/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function handleAddExpenseToDataBase(id:string,formData: FormData) {
    const title = formData.get('title');
    const value = formData.get('value');
    const date = formData.get('date');
    const comment = formData.get('comment');

    const expenses = {
        title,
        value,
        date,
        comment,
        type:'expense'
    };

    try {
        const userDocRef = doc(db, 'users', id);
        await updateDoc(userDocRef, {
            expenses: arrayUnion(expenses)
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
    revalidatePath('/expenses');
}

export async function handleAddIncomeToDataBase(id:string, formData: FormData) {
    const title = formData.get('title');
    const value = formData.get('value');
    const date = formData.get('date');
    const comment = formData.get('comment');

    const income = {
        title,
        value,
        date,
        comment,
        type:'income'
    };

    try {
        const userDocRef = doc(db, 'users', id);
        await updateDoc(userDocRef, {
            incomes: arrayUnion(income)
        });
    } catch (error) {
        console.error("Error updating document: ", error);
    } 
    revalidatePath('/income');
}