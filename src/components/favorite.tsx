import endPoint from "@services/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { MdStar } from "react-icons/md";

export default function Favorite({ dream, auth }: { dream: any; auth: any }) {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState<any>('');
  const [likes, setLikes] = useState<number>(0);
  useEffect(() => {
    const a = dream.favorites.filter(
      (favorite: any) => favorite.createdBy === auth.user.username
    )[0];
    setLiked(a);
    setLike(a?.id);
    setLikes(dream.favorites.length)
  }, []);
  const likeHandler = async () => {
    if (!liked) {
      await axios
        .post(endPoint.favorites.create, { dream: dream.id })
        .then((data: any) => {
          console.log(data)
          setLike(data.data.id)
          setLiked(true);
          setLikes(likes+1)
          auth.setAlert({
            active: true,
            message: "Saved in your favorites",
            type: "success",
            autoClose: true,
          });
        })
        .catch((e: any) => {
          auth.setAlert({
            active: true,
            message: "Error: " + e.message,
            type: "error",
            autoClose: true,
          });
          setLiked(false);
        });
    } else {
      await axios
        .delete(endPoint.favorites.delete(like))
        .then(() => {
          console.log(like)
          setLiked(false);
          setLikes(likes - 1);
        })
        .catch((e: any) => {
          setLiked(true);
        });
    }
  };
  return (
    <>
      <div
        className={
          "flex gap-1 rounded-lg justify-center p-3 items-center w-full h-full cursor-pointer text-xl " +
          (liked
            ? "text-teal-500 hover:text-gray-200 hover:bg-teal-500 duration-150"
            : "text-gray-300 hover:text-teal-500 duration-150")
        }
        onClick={likeHandler}
      >
        <li>{<FaStar />}</li>
        <li className="ml-1 text-sm">{''+likes}</li>
      </div>
    </>
  );
}
