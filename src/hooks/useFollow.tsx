import endPoint from "@services/api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useFollow(account:any, user:any) {
  const [connect, setConnect] = useState(false);
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
      const { data } = await axios.post(endPoint.follow.follow, {
        following: user?.username,
      });
      setConnect(true);
      user.followers.push({})
      return;
    }
    const { data } = await axios.delete(
      endPoint.follow.unFollow(user?.username)
    );
    setConnect(false);
    user.followers.pop()
  };
  return {
    connect,
    followHandler,
    isFollowed
  }
}
