"use client";
import React, { useEffect, useState } from "react";
import Notification from "@/components/notification";
import signup from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordOnFocus, setPasswordOnFocus] = useState(false);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const reenterPasswordInputRef = React.useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<any>(null);
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    const { result, error } = await signup({ password, email });
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

    // Check if the new password meets the validation criteria
    setIsPasswordValid(passwordValidation(newPassword));
  };

  const handleClickOutside = (e: any) => {
    if (
      !isPasswordValid &&
      passwordInputRef.current &&
      !passwordInputRef.current.contains(e.target.value)
    ) {
      setPasswordOnFocus(false);
    } else {
      setPasswordOnFocus(true);
      setNotification({
        message: "Password must meet the criteria.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen flex items-center">
      <div className="w-[50%] mx-auto bg-gray-600 p-10 rounded-xl ">
        <h1 className="text-center text-xl font-bold"> Welcome Back </h1>
        <h1 className="text-center"> Sign in as </h1>
        <form onSubmit={handleForm}>
          
          <div className="text-center pt-10">
            <Link type="submit" className="bg-gray-800 px-5 py-1 rounded-lg disabled:bg-gray-800/10" href='/facilitatorlogin'>
              facilitator
            </Link>
          </div>
          <div className="text-center pt-10">
            <Link type="submit" className="bg-gray-800 px-5 py-1 rounded-lg disabled:bg-gray-800/10" href='/studentlogin'>
              student
            </Link>
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
