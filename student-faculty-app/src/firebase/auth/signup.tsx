import firebaseAuthen from "./firebaseAuth";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const authen = getAuth(firebaseAuthen);


export default async function signUp({email, password}: {email: string, password: string}) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(authen, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}