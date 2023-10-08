"use client";
import React, { useEffect, useState } from "react";
import Notification from "@/components/notification";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signIn({ password, email });
    if (error) {
      console.log(error);
      return;
    }
    console.log(result);
    router.push("/home");
  };

  const passwordValidation = (password: any) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const onPasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };


  return (
    <div className="h-screen flex items-center">
      <div className="w-[50%] mx-auto bg-gray-600 p-10 rounded-xl ">
        <h1 className="text-center text-xl font-bold"> Welcome Back </h1>
        <h1 className="text-center"> Sign in </h1>
        <form onSubmit={handleForm}>
          {/* <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2"></label>
            <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} placeholder="name"/>
          </div> */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            ></label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            ></label>
            <input
              type="text"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black "
              value={password}
              onChange={onPasswordChange}
              placeholder="password"
            />
          </div>
          <div><p>don't have an account? <Link href="/facilitator" className="text-blue-500 hover:underline">sign up</Link> </p></div>
          <div className="text-center pt-10">
            <button type="submit" className="bg-gray-800 px-5 py-1 rounded-lg disabled:bg-gray-800/10">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordRequirementsModal({ password }: { password: string }) {
  return (
    <div className="text-black rounded-[10px] p-3 border-black absolute bg-white text-[14px] tom-10 right-0">
      <h3>Password Requirements</h3>
      <ul>
        {/[a-z]/.test(password) ? (
          <li className="text-green-500">At least one letter</li>
        ) : (
          <li className="text-red-500">At least one letter</li>
        )}
        {/[A-Z]/.test(password) ? (
          <li className="text-green-500">At least one capital letter</li>
        ) : (
          <li className="text-red-500">At least one capital letter</li>
        )}
        {/\d/.test(password) ? (
          <li className="text-green-500">At least one number</li>
        ) : (
          <li className="text-red-500">At least one number</li>
        )}
        {password.length >= 8 ? (
          <li className="text-green-500">Minimum 8 characters</li>
        ) : (
          <li className="text-red-500">Minimum 8 characters</li>
        )}
      </ul>
    </div>
  );
}
