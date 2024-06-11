// 'use server'

// import { auth, db } from "@/services/firebase";
// import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// import { revalidatePath } from "next/cache";

// export async function handleAddExpenseToDataBase(formData: FormData) {
//     const title = formData.get('title');
//     const value = formData.get('value');
//     const date = formData.get('date');
//     const comment = formData.get('comment');

//     const expenses = {
//         title,
//         value,
//         date,
//         comment,
//         type:'expense'
//     };

//     try {
//         const userDocRef = doc(db, 'users', auth.currentUser!.uid);
//         await updateDoc(userDocRef, {
//             expenses: arrayUnion(expenses)
//         });
//         console.log('deu certo');
//     } catch (error) {
//         console.error("Error updating document: ", error);
//     }
//     revalidatePath('/expenses');
// }