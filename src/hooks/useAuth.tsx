import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useState, useContext, createContext, useEffect } from "react";
import useAlert from "./useAlert";
import axios from "axios";
import endPoint from "@services/api";

const AuthContext = createContext({});

export default function ProviderAuth({ children }: { children: JSX.Element }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState({});
  const { alert, setAlert, toggleAlert } = useAlert({});

  const publicRoutes = ["/login", "/signup"];

  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token && !publicRoutes.includes(router.pathname)) {
      router.replace("/login");
      return;
    }
    async function loadUser() {
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const { data: user } = await axios.get(endPoint.users.account);
      setUser(user);
    }
    if(token){
      loadUser()
    }
  }, [alert]);

  const signIn = async (email: string, password: string) => {
    const options: any = {
      Headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const { data: token } = await axios.post(
      endPoint.auth.login,
      { username: email, password },
      options
    );
    console.log(token);
    if (token) {
      Cookies.set("token", token, { expires: 5 });

      axios.defaults.headers.Authorization = `Bearer ${token}`;

      const { data: user } = await axios.get(endPoint.users.account, options);
      setUser(user);
      router.push("/");
    }
  };

  const signUp = async (entity: {
    name: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const options: any = {
      Headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(endPoint.users.create, entity, options);
    if (data.username) {
      await signIn(data.username, entity.password).then(() => {
        router.push("/");
        setAlert({
          active: true,
          message: "Login Success",
          type: "success",
          autoClose: true,
        });
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      });
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser({});
    delete axios.defaults.headers.Authorization;
    router.push("/login");

    router.push("/login");
  };

  return {
    user,
    signIn,
    signUp,
    logout,
    token,
    alert,
    setAlert,
    toggleAlert,
  };
}
