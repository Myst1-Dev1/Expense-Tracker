import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchUserData(uid:string) {
    let userData = null;

    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            userData = { id: userDoc.id, ...userDoc.data() };
        } else {
            console.log('Usuário não encontrado');
        }
    } catch (error) {
        console.log(error);
    }

    return userData
}