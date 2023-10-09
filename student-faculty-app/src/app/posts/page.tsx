"use client";

import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { db } from "../../firebase/firestore/firebaseFirestore";
import React from "react";

function MyComponent() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) {
      router.push("/facilitatorlogin");
    }
  }, [user]);

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
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  console.log(posts);
  console.log(fetchComments);

  const handleCommentChange = ({
    postId,
    event,
  }: {
    postId: string;
    event: any;
  }) => {
    setComments((prev: any) => ({
      ...prev,
      [postId]: event.target.value,
    }));
  };

  const handleCommentSubmit = async (postId: string | number) => {
    const comment = comments[postId];

    if (comment) {
      try {
        const docRef = await addDoc(collection(db, "comments"), {
          postId,
          comment,
        });

        console.log("Comment added with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }

    setComments((prev: any) => ({
      ...prev,
      [postId]: "",
    }));
  };

  return (
    <div>
      <div className="w-[80%] my-3 flex justify-between mx-auto">
        <h1 className="text-4xl font-bold">Student's Issues</h1><button className="bg-gray-900 font-bold w-fit rounded-xl px-2 py-1">logout</button></div>
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
                onChange={(event) =>
                  handleCommentChange({ postId: post.id, event })
                }
              />
              <button
                type="submit"
                className="bg-gray-900 font-bold w-fit rounded-xl px-2 py-1"
                onClick={() => handleCommentSubmit(post.id)}
              >
                send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
