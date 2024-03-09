import useFollow from "@hooks/useFollow";
import { useAuth } from "@hooks/useAuth";
import endPoint from "@services/api";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiPlugsConnected } from "react-icons/pi";
import { RiChatSmile2Fill } from "react-icons/ri";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useRouter } from "next/router";

export default function ProfileCard({ user }: { user: any }) {
  const router = useRouter()
  const {user:account, token}:any = useAuth()
  const {connect, followHandler} = useFollow(account, user)
  const paragraph =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde. Similique id a at autem earum itaque, ipsa dicta libero veniam numquam maxime vitae inventore sequi qui, error impedit incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde. Similique id a at autem earum itaque, ipsa dicta libero veniam numquam maxime vitae inventore sequi qui, error impedit incidunt.";
  const [description, setDescription] = useState<any>();
  let size = paragraph.length;
  useEffect(() => {
    changeSize();
  }, [account]);
  const changeSize = () => {
    const arr: any[] = paragraph.split(" ");
    size = size < arr.length ? arr.length : 30;
    let result = "";
    for (let i = 0; i < size; i++) {
      result += arr[i] + " ";
    }
    setDescription(<button onClick={changeSize}>{result}</button>);
    if (size < arr.length) {
      setDescription(<button onClick={changeSize}>{result + "..."}</button>);
    }
  };
  const chatHandler = async () => {
      const {data} = await axios.post(endPoint.chats.create, {secondaryUser: user?.username})
      router.push("/chat?tab="+data.id)
  }
  const date = new Date(user?.createdAt);
  return (
    <div className="max-w-lg flex flex-col gap-5 p-10 bg-white lg:rounded-xl shadow-lg justify-center items-center relative">
      <img
        src="https://wallpaperaccess.com/full/967689.jpg"
        alt=""
        className="w-full h-fit absolute top-0 left-0 opacity-60"
      />
      <div className="absolute flex gap-3 right-3 top-3">
        <div className=" cursor-pointer opacity-60 bg-white rounded-full w-fit p-2 text-teal-500 shadow-md hover:text-white hover:bg-teal-500 duration-300 hover:shadow-xl">
          {!connect ? <PiPlugsConnected onClick={followHandler} className="w-6 h-6" /> : <VscDebugDisconnect onClick={followHandler} className="w-6 h-6 text-red-500 hover:text-white" />}
        </div>
        <div onClick={chatHandler} className=" cursor-pointer opacity-60 bg-white rounded-full w-fit p-2 text-teal-500 shadow-md hover:text-white hover:bg-teal-500 duration-300 hover:shadow-xl">
          <RiChatSmile2Fill className="w-6 h-6" />
        </div>
      </div>
      <div className="relative w-full h-full flex justify-center">
        <img
          src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg"
          alt=""
          className="max-w-40 rounded-full shadow-lg"
        />
      </div>
      <div className="flex flex-col gap-5 w-full h-full justify-center items-center">
        <div className="flex flex-col items-center gap-5 z-10">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-lg font-light ">{"@" + user?.username}</span>
            <h1 className="font-sans text-2xl font-semibold">
              {user?.name + " " + user?.lastName}
            </h1>
          </div>
          <div className="flex gap-3 text-base">
            <div className="flex flex-col gap-1 justify-center items-center">
              <span className="font-extralight">Dreams</span>
              <b>{user?.dreams.length}</b>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <span className="font-extralight">Following</span>
              <b>{user?.followings.length}</b>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <span className="font-extralight">Followers</span>
              <b>{user?.followers.length}</b>
            </div>
          </div>
          <p className="text-center">{description}</p>
          <span className="text-lg font-light text-teal-700">
            {date.toDateString()}
          </span>
        </div>
        <Link href={`/profile/${user?.username}`} className="border-2 border-gray350 text-center text-gray-800 hover:border-teal-500 hover:bg-teal-500 hover:text-gray-50 p-3 rounded-lg shadow-md w-full duration-300">
          View Profile
        </Link>
      </div>
    </div>
  );
}
