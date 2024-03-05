import Separator from "@common/separator";
import { FaShare, FaUser } from "react-icons/fa";
import Favorite from "./favorite";
import Comment from "./comments";
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
            <Favorite dream={dream} auth={auth} />
          <li>
            <Comment  dream={dream} auth={auth} />
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
