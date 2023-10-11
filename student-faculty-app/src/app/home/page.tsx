"use client";
import { db } from "../../firebase/firestore/firebaseFirestore";
import {
  collection,
  addDoc,
  query,
  DocumentData,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUser from "@/redux/hooks/useUser";

async function addDataToFirebase({
  name,
  email,
  message,
}: {
  user: string;
  name: string;
  email: string;
  message: string;
}) {
  // const auth = useSelector((state: any) => state.user.user.email);
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
    });
    console.log("Document written with ID: ", docRef.id);
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export default function Home() {
  const { logout } = useUser();
  const user = useSelector((state: any) => state.user?.user?.email);
  const loggedIn = useSelector((state: any) => state.user.isLoggedIn);
  console.log(user);
  console.log(loggedIn);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handleForm = async (event: any) => {
    event.preventDefault();
    const result = await addDataToFirebase({ user, name, email, message });
    if (result) {
      alert("Data added successfully");
      console.log("Document written");
    } else {
      alert("Error adding data");
    }
  };

  useEffect(() => {
    if (loggedIn === false) {
      window.location.href = "/firstpage";
    }
  }, [loggedIn]);

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logout();
  };

  const [posts, setPosts] = useState<any>([]);
  // const [docId, setDocId] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [fetchComments, setFetchComments] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "messages"));
      const commentsRef = collection(db, "comments");
      try {
        const postsData: { id: string; data: DocumentData }[] = [];
        const commentsData: { id: string; data: DocumentData }[] = [];
        const querySnapshot = await getDocs(q);
        const commentsSnapshot = await getDocs(commentsRef);
        querySnapshot.forEach((doc) => {
          if (doc.data().email === user) {
            const postWithId = {
              id: doc.id,
              data: doc.data(),
            };
            const commentWithId = {
              id: doc.id,
              data: doc.data(),
            };
            commentsSnapshot.forEach((doc) => {
              if (doc.data().postId === postWithId.id) {
                commentWithId.id = doc.id;
                commentWithId.data = doc.data();
                commentsData.push(commentWithId);
              }
            });
            setFetchComments(commentsData);
            postsData.push(postWithId);
            setPosts((prev: any) => [...prev, postWithId]);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  console.log(posts);
  console.log(fetchComments);

  return (
    <>
    <div className="h-screen flex items-center">
      <div className="w-[80%] mx-auto bg-gray-600 p-10 rounded-xl ">
        <div className="my-3 flex justify-between mx-auto">
          <h1 className="text-2xl font-bold">Send message to facilitatior</h1>
          <button
            className="bg-gray-900 font-bold w-fit rounded-xl px-2 py-1"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>

        <form onSubmit={handleForm}>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            ></label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            ></label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2"
            ></label>
            <textarea
              rows={5}
              id="message"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 px-5 py-1 mt-10 rounded-lg disabled:bg-gray-800/10"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <div>
      <div className="w-[80%] my-3 flex justify-between mx-auto">
        <h1 className="text-4xl font-bold">Your Messages</h1><button className="bg-gray-900 font-bold w-fit rounded-xl px-2 py-1">logout</button></div>
      <div>
        {posts.map((post: any) => (
          <div className="w-[80%] mx-auto bg-gray-600 p-10 rounded-xl my-3">
            <div className="bg-gray-900 font-bold w-fit rounded-xl px-3 py-1 ">
              <p>{post.data.name}</p>
              <p className="text-[12px]">{post.data.email}</p>
            </div>
            <div>
              <div className="bg-gray-500 rounded-xl p-3 my-2">
                <h3>Message</h3>
                <p className="">{post.data.message}</p>
              </div>
            </div>
            <div>
              <div className="bg-gray-500 rounded-xl p-3 my-2">
                <h3>Comments</h3>
                <ul>
                  {fetchComments.map(
                    (comment: {
                      id: React.Key | null | undefined;
                      data: {
                        comment:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | React.PromiseLikeOfReactNode
                          | null
                          | undefined;
                          postId: React.Key | null | undefined | string;
                      };
                    }) => (<div>{post.id == comment.data.postId ? <li key={comment.id}>{comment.data.comment}</li> : <></>}</div>
                      
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <input
                type="text"
                className="border-1  border-gray-900 rounded-xl px-3 focus:outline-none"
                placeholder="reply"
                value={comments}
                // onChange={(event) =>
                  // handleCommentChange({ postId: post.id, event })
                // }
              />
              <button
                type="submit"
                className="bg-gray-900 font-bold w-fit rounded-xl px-2 py-1"
                // onClick={() => handleCommentSubmit(post.id)}
              >
                send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
