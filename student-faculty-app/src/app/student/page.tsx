"use client";
import React, { useEffect, useState } from "react";
import Notification from "@/components/notification";
import signup from "../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Provider, useDispatch } from "react-redux";
import useUser from "@/redux/hooks/useUser";

export default function Home() {
  const { user, isLoggedIn, login, logout } = useUser();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<any>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordOnFocus, setPasswordOnFocus] = useState(false);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const reenterPasswordInputRef = React.useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<any>(null);
  const [blankError, setBlankError] = useState<any>(null);
  const [invalidEmail, setInvalideEmail] = useState<any>("");
  const router = useRouter();

  const dispatch = useDispatch();


  // useEffect(() => {
  //   if(typeof window !== 'undefined') {
  //     const storedUser = localStorage.getItem("user");
  //     const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  //     dispatch(setUser({email: parsedUser?.email || null}));
  //     if (storedUser) {
  //       router.push("/home");
  //     }console.log("user", storedUser)
  //   }
  // }, []);
  
  // const handleForm = async (event:any) => {
  //   event.preventDefault();

  //   try {
  //     // dispatch(setLoading(true));
  //     if (!email || !password) {
  //       setBlankError("Please provide both email and password");
  //     }
  //     const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  //     if (!emailRegex.test(email)) {
  //       setInvalideEmail("Please provide a valid email");
  //     }
  //     const { result, error } = await signup({ password: password || '', email: email || '' });
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     localStorage.setItem("user", JSON.stringify(email));
  //     dispatch(setUser(email));
  //     console.log(result);
  //     router.push("/home");

  //   } catch (error) {
  //     const typeError = error as TypeError;
  //     dispatch(setError(typeError.message));
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
    // if (error) {
    //   console.log(error);
    //   return;
    // }
    // console.log(result);
    // router.push("/home");
  // };

  const handleForm = async (event: any) => {
    event.preventDefault();
    const { result, error } = await signup({ password: password || '', email: email || '' });
      if (error) {
        console.log(error);
        return;
      }
      login({email: email || '', password: password || ''});
      console.log(result);
      router.push("/home");
  }

  useEffect(() => {
    console.log(user);
  }, [isLoggedIn]);


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
    // <Provider store={store}>
    <div className="h-screen flex items-center">
      <div className="w-[50%] mx-auto bg-gray-600 p-10 rounded-xl ">
        <h1 className="text-center text-xl font-bold"> Welcome Back </h1>
        <h1 className="text-center"> Sign up</h1>
        <form onSubmit={handleForm}>
          <div>
            {blankError && (
              <Notification
                message={blankError}
                type="error"
                onClose={() => setBlankError(null)}
              />
            )}
            {invalidEmail && (
              <Notification
                message={invalidEmail}
                type="error"
                onClose={() => setInvalideEmail(null)}
              />
            )}
          </div>
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
              onFocus={() => setPasswordOnFocus(true)}
              placeholder="password"
              ref={passwordInputRef}
            />
            {passwordOnFocus && !isPasswordValid && (
              <PasswordRequirementsModal password={password} />
            )}
          </div>
          <div>
            <label
              htmlFor="verifypassword"
              className="block text-gray-700 font-bold mb-2"
            ></label>
            <input
              type="text"
              id="verifypassword"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none text-black"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              placeholder="verify password"
              ref={reenterPasswordInputRef}
            />
          </div>
          <div>
            <p>
              Have an account?{" "}
              <Link
                href="/studentlogin"
                className="text-blue-500 hover:underline"
              >
                Login
              </Link>{" "}
            </p>
          </div>
          <div className="text-center pt-10">
            <button
              type="submit"
              className="bg-gray-800 px-5 py-1 rounded-lg disabled:bg-gray-800/10"
              disabled={!isPasswordValid}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
    // </Provider>
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
