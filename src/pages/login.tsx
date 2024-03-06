import { useAuth } from "@hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { GiNightSleep } from "react-icons/gi";

export default function Login() {
  const inputStyle =
    "p-2 border-0 border-b-2 border-b-teal-500 hover:border-b-teal-200 bg-transparent placeholder-white text-white outline-none duration-300 ";

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const auth: any = useAuth();
  const router = useRouter();

  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    auth
      .signIn(email, password)
      .then(() => {
        router.push("/");
        auth.setAlert({
          active: true,
          message: "Login Success",
          type: "success",
          autoClose: true,
        });
        setTimeout(() => {
          auth.setAlert(false);
        }, 2000);
      })
      .catch((e: any) => {
        auth.setAlert({
          active: true,
          message: "Error: " + e.message,
          type: "error",
          autoClose: true,
        });
        setTimeout(() => {
          auth.setAlert(false);
        }, 4000);
      });
  };

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-l from-teal-50 to-teal-100">
      <form
        onSubmit={submitHandle}
        className="flex flex-col gap-5 bg-gradient-to-b from-teal-600 to-teal-300 p-8 rounded-lg shadow-xl "
      >
        <div className="flex items-center justify-center flex-col gap-6">
          <GiNightSleep className="text-9xl text-teal-50" />
          <h1 className="font-serif text-4xl font-light text-white">LOG IN</h1>
          <input
          required
            ref={emailRef}
            className={inputStyle}
            type="text"
            placeholder="Username or Email"
          />
          <input
          required
            ref={passwordRef}
            className={inputStyle}
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-gray-50 font-sans text-gray-900 p-2 rounded-lg w-full shadow-xl duration-300 hover:bg-teal-200"
            type="submit"
          >
            Login
          </button>
        </div>
        <Link className="text-gray-600 hover:underline underline-offset-2 text-center" href="/signup">
            Create an account here.
          </Link>
      </form>
    </div>
  );
}
