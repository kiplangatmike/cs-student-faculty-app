"use client";
import React, { useState } from "react";


export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handleForm = async (event: any) => {
    event.preventDefault();

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


