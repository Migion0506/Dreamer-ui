import endPoint from "@services/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export default function useFollow(account:any, user:any) {
  const [connect, setConnect] = useState(false);
  const auth:any = useAuth()
  useEffect(() => {
    setConnect(isFollowed())
  }, [account])
  const isFollowed = () => {
    return (
      account?.followings?.findIndex(
        (u: any) => u.following === user?.username
      ) !== -1
    );
  };
  const followHandler = async (e: any) => {
    if (!connect) {
      try{
        const { data } = await axios.post(endPoint.follow.follow, {
          following: user?.username,
        });
        setConnect(true);
        user.followers.push(data)
        auth.setAlert({
          active: true,
          message: "Following to @" + user?.username,
          type: "success",
          autoClose: true,
        })
        return;
      }catch(error:any){
        auth.setAlert({
          active: true,
          message: "Error: " + error.message,
          type: "error",
          autoClose: true,
        })
        return;
      }
    }
    try {
      const { data } = await axios.delete(
        endPoint.follow.unFollow(user?.username)
      );
      setConnect(false);
      user.followers.pop()
      auth.setAlert({
        active: true,
        message: "Unfollowing to @" + user?.username,
        type: "alert",
        autoClose: true,
      })
    } catch (error:any) {
      auth.setAlert({
        active: true,
        message: "Error: " + error.message,
        type: "error",
        autoClose: true,
      })
    }
  };
  return {
    connect,
    followHandler,
    isFollowed
  }
}
