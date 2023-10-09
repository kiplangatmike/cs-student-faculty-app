import firebase_app from "../auth/firebaseAuth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData({collection, data}: {collection: string, data: any}) {
    let result = null,
        error = null;

    try {
        result = await setDoc(doc(db, collection), data, { merge: true });
    }catch (e) {
        error = e;
    }
    return { result, error };
}