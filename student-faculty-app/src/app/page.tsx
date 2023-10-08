"use client";
import db from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";

async function addDataToFirebase({name, email, message}: {name: string, email: string, message: string}) {
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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handleForm = async (event: any) => {
    event.preventDefault();
    const result = await addDataToFirebase({ name, email, message });
    if (result) {
      alert("Data added successfully");
      console.log("Document written");
    } else {
      alert("Error adding data");
    }
  };


  return (
    <div>
      <div>
        <h1> Send message to facilitatior </h1>
        <form onSubmit={handleForm}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2"></label>
            <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2"></label>
            <input type="text" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2"></label>
            <textarea rows={5} id="message" className="w-full px-3 py-2 border rounded-lg focus:outline-none" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="message"></textarea>
          </div>
          <div>
            <button type="submit">submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}


