import { useAuth } from "@hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { GiNightSleep } from "react-icons/gi";

export default function Singup() {
  const inputStyle = "p-2 border-0 border-b-2 border-b-teal-600 hover:border-b-teal-200 bg-transparent placeholder-white text-white outline-none duration-300 ";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const auth: any = useAuth();
  const router = useRouter();

  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    const name = nameRef?.current?.value;
    const lastName = lastNameRef?.current?.value;
    const username = usernameRef?.current?.value;
    const pictureUrl = 'https://www.readersdigest.com.au/wp-content/uploads/2020/12/cat-lying-on-back-British-mackerel-shutterstock-e1573490045672-scaled.jpg'

    auth
      .signUp({email, password, name, lastName, username})
      .catch((e: any) => {
        auth.setAlert({
          active: true,
          message: "Error: " + e.message,
          type: "error",
          autoClose: true,
        });
        setTimeout(() => {
          auth.setAlert(false);
        }, 2000);
      });
  };

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-l from-teal-50 to-teal-100">
      <form
        onSubmit={submitHandle}
        className="flex items-center justify-center flex-col gap-6 bg-gradient-to-b from-teal-600 to-teal-300 p-8 rounded-lg shadow-xl"
      >
        <div className="flex items-center justify-center flex-col gap-6">
          <GiNightSleep className="text-9xl text-teal-50" />
          <h1 className="font-serif text-white text-4xl font-light">SIGN UP</h1>
          <input required ref={nameRef} className={inputStyle} type="text" placeholder="Name" />
          <input required ref={lastNameRef} className={inputStyle} type="text" placeholder="Last Name" />
          <input required ref={usernameRef} className={inputStyle} type="text" placeholder="Username" />
          <input required ref={emailRef} className={inputStyle} type="email" placeholder="Email" />
          <input
            ref={passwordRef}
            className={inputStyle}
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-gray-50 font-sans text-gray-900 p-2 rounded-lg w-full shadow-xl duration-300 hover:bg-teal-200"
            type="submit"
          >
            create Account
          </button>
        </div>
        <div>
          <Link
            className="text-gray-600 hover:underline underline-offset-2"
            href="/login"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
