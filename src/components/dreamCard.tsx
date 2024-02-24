import Separator from "@common/separator";
import endPoint from "@services/api";
import axios from "axios";
import { useState } from "react";
import { FaRegCommentDots, FaShare, FaUser } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineReport } from "react-icons/md";

const topics = [
  "action",
  "romance",
  "adventure",
  "fantasy",
  "horror",
  "comedy",
  "drama",
  "thriller",
];

export default function DreamCard({dream, auth}: {dream:any, auth:any}) {
  const [likeIcon, setLikeIcon] = useState({icon: <FcLikePlaceholder  className=" hover:text-red-500" />, active: false})
  const likeHandler = async () => {
    if(!likeIcon.active){
      await axios.post(endPoint.favorites, {dream: dream.id}).then(() => {
        auth.setAlert({
          active: true,
          message: "Saved in your favorites",
          type: "success",
          autoClose: true,
        });
        setLikeIcon({
          active: true,
          icon: likeIcon.active ? <FcLikePlaceholder className=" text-red-500" /> : <FcLike  className=" hover:text-red-500" />,
        })
      })
      .catch((e: any) => {
        auth.setAlert({
          active: true,
          message: "Error: " + e.message,
          type: "error",
          autoClose: true,
        });
        setLikeIcon({
          active:false,
          icon: likeIcon.active ? <FcLikePlaceholder className=" text-red-500" /> : <FcLike  className=" hover:text-red-500" />,
        })
      })
    }else{
      await axios.delete(endPoint.favorites, {data:{dream: dream.id}}).then(() => {
        setLikeIcon({
          active: false,
          icon: <FcLike  className=" hover:text-red-500" />,
        })
      })
      .catch((e: any) => {
        setLikeIcon({
          active: true,
          icon: <FcLikePlaceholder className=" text-red-500" />,
        })
      })
    }
  };
  return (
    <>
    <div className="flex flex-col gap-2 p-2 hover:bg-slate-200 rounded-lg w-full">
      <nav className="flex justify-between gap-2">
        <ul className="flex flex-wrap gap-2 text-sm items-center justify-center">
          <li>
            <FaUser />
          </li>
          <li>{dream.createdBy}</li>
          <hr className="bg-gray-600 h-1 w-1 rounded-full" />
          <li>{new Date(dream.createdAt).toLocaleDateString()}</li>
        </ul>
        <ul className="flex gap-2 text-sm">
          <li className="flex gap-1 text-m hover:cursor-pointer items-center justify-center hover:text-red-500 ">
            Report
            <MdOutlineReport className="text-lg" />
          </li>
        </ul>
      </nav>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-xl">{dream.title}</h1>
        <div className="flex flex-wrap gap-1">
          {topics.map((topic, key) => (
            <span
              key={key}
              className="bg-teal-500 p-[2px] px-[4px] max-w-fit font-normal gap-2 text-xs rounded-lg text-slate-100"
            >
              {topic}
            </span>
          ))}
        </div>
        <p className="text-sm">
          {dream.content}
        </p>
        <img src={dream.pictureUrl} alt="" className="w-fit max-h-full rounded-lg"/>
      </div>
      <nav className="flex justify-between gap-2">
        <ul className="flex gap-2  items-center justify-center text-xl">
          <li className="hover:cursor-pointer" onClick={likeHandler}>
            {likeIcon.icon}
          </li>
          <li>
            <FaRegCommentDots />
          </li>
        </ul>
        <ul className="flex gap-2 text-lg items-center justify-center">
          <li>
            <FaShare />
          </li>
        </ul>
      </nav>
    </div>
    <Separator />
    </>
  );
}
