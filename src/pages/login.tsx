import { useAuth } from "@hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Login() {
  const inputStyle =
    "p-2 bg-transparent border-b-2 border-cyan-900 text-gray-700 outline-none ";

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
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-gray-50">
      <form
        onSubmit={submitHandle}
        className="flex flex-col gap-5 bg-slate-300 p-8 rounded-lg shadow-xl "
      >
        <div className="flex items-center justify-center flex-col gap-6 ">
          <h1 className="font-sans text-4xl font-bold">Login</h1>
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
            className="bg-cyan-900 font-sans text-white p-2 rounded-lg w-full shadow-xl"
            type="submit"
          >
            Login
          </button>
        </div>
        <div>
          <Link className="text-gray-600 hover:underline underline-offset-2" href="/signup">
            Create an account here.
          </Link>
        </div>
      </form>
    </div>
  );
}
