import { db } from "@/firebase/firebaseConfig";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";

const fetchCommentsForPost = async (postId: any) => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    const comments: { id: string; data: DocumentData; }[] = [];
    
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        data: doc.data(),
      });
    });
  
    return comments;
  };

  export default fetchCommentsForPost;