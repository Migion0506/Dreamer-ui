import endPoint from "@services/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

export default function Favorite({dream, auth}: {dream:any, auth:any}) {
  const [likeIcon, setLikeIcon] = useState({icon: <FcLikePlaceholder  className=" hover:text-red-500" />, active: false, id: '', count: 0})
  useEffect(() => {
    const a = dream.favorites.filter((favorite: any) => favorite.createdBy === auth.user.username)[0];
    console.log(a)
    setLikeIcon({icon: !a ? <FcLikePlaceholder className=" text-red-500" /> : <FcLike  className=" hover:text-red-500" />, active: a, id: a ? a.id : '', count: dream.favorites.length});
  }, [])
  const likeHandler = async () => {
    if(!likeIcon.active){
      await axios.post(endPoint.favorites.create, {dream: dream.id}).then((data:any) => {
        auth.setAlert({
          active: true,
          message: "Saved in your favorites",
          type: "success",
          autoClose: true,
        });
        setLikeIcon({
          active: true,
          icon: likeIcon.active ? <FcLikePlaceholder className=" text-red-500" /> : <FcLike  className=" hover:text-red-500" />,
          id: data.id,
          count: likeIcon.count + 1
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
          id: '',
          count: likeIcon.count
        })
      })
    }else{
      await axios.delete(endPoint.favorites.delete(likeIcon.id)).then(() => {
        setLikeIcon({
          active: false,
          icon: <FcLikePlaceholder  className=" hover:text-red-500" />,
          id: '',
          count: likeIcon.count - 1
        })
      })
      .catch((e: any) => {
        setLikeIcon({
          active: true,
          icon: <FcLike className=" text-red-500" />,
          id: likeIcon.id,
          count: likeIcon.count
        })
      })
    }
  };
  return (
    <>
      <div className="flex gap-1 justify-center items-center">
        <li className="hover:cursor-pointer" onClick={likeHandler}>
          {likeIcon.icon}
        </li>
        <li className="font-sans text-lg">
          {likeIcon.count}
        </li>
      </div>
    </>
  );
}
