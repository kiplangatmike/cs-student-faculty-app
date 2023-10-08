"use client";

import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

// import Link from "next/link";
import { db } from "../../firebase/auth/firebaseFirestore";
// import { collection, getDocs, doc } from "firebase/firestore";

// import { useEffect, useState } from "react";

// import { useRouter } from 'next/router';
// import firebase from 'firebase/app';
// import {Container, Row, Col, Button, Input, Form} from 'reactstrap';
// import { useCollection } from "react-firebase-hooks/firestore";

// const LoggedIn = () => {

//   const [post, setPost] = useState('');
//   const db = firebase.firestore();
//   const router = useRouter();
//   const onSubmit =  (event) => {
//     console.log(post)
//    try {
//      db.collection("posts").add({
//       title : post,
//     }).then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//   })
// } catch(error)  {
//       console.error("Error adding document: ", error);
//   };
//     event.preventDefault()
//   };
//   const [posts, postsloading, postserror] = useCollection(
//     firebase.firestore().collection("posts"),
//     {}
//   );

//   // Listen for changes on loading and authUser, redirect if needed
//   useEffect(() => {
//     if (!loading && !authUser)
//       router.push('/')
//   }, [authUser, loading])

//   return (
//     <Container>
//       // ...
//       <Button onClick={signOut}>Sign out</Button>
//       // ...
//       <Col>
//       <h1> Posts </h1>
//       <div>
//       {postserror && <strong>Error: {JSON.stringify(postserror)}</strong>}
//         {postsloading && <span>Collection: Loading...</span>}
//       {posts && posts.docs.map((doc) => (
//               <div>
//                 {JSON.stringify(doc.data())},{' '}
//               </div>
//             ))}
//             </div>
//             <Form  className="custom-form"
//             onSubmit={onSubmit}>
//             <Input value={post} onChange={(event) => setPost(event.target.value)} />
//             <Button >Add post</Button>
//             </Form>
//       </Col>
//     </Container>
//   )
// }

// export default LoggedIn;

function MyComponent() {
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "messages"));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setPosts((prev: any) => [...prev, doc.data()]);
          console.log("no doc", doc.id, " => ", doc.data());
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>My Component</div>
      <div>
        {posts.map((post: any) => (
          <div className="w-[80%] mx-auto bg-gray-600 p-10 rounded-xl my-3">
            <div className="bg-gray-900 font-bold w-fit rounded-xl px-3 py-1 ">
              <p >
                {post.name}
              </p>
              <p className="text-[12px]">{post.email}</p>
            </div>
            <div>
              <div className="bg-gray-500 rounded-xl p-3 my-2">
                <h3>Message</h3>
                <p className="">{post.message}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <input
                type="text"
                className="border-1  border-gray-900 rounded-xl px-3"
                placeholder="reply"
              />
              <button type="submit" className="bg-gray-900 font-bold w-fit rounded-xl px-2 py-1">send</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
