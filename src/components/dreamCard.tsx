import Separator from "@common/separator";
import { FaShare, FaUser } from "react-icons/fa";
import Favorite from "./favorite";
import Comment from "./comments";
import { MdOutlineReport } from "react-icons/md";
import Tag from "@common/tag";
import { enUS } from "date-fns/locale";
import { formatRelative, subDays } from "date-fns";

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

export default function DreamCard({ dream, auth }: { dream: any; auth: any }) {
  const btnStyle = "w-full h-full rounded-lg flex justify-center"
  function getDate() {
    const date = new Date(dream.createdAt);
    return formatRelative(subDays(date, 3), new Date(), { locale: enUS });
  }
  return (
    <>
      <div className="flex flex-col gap-2 bg-white duration-300 transition rounded-lg w-full">
        <nav className="flex justify-between gap-2 p-3">
          <ul className="flex flex-wrap gap-2 text-sm items-center justify-center">
            <li>
              <img
                src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg"
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </li>
            <li>
              <div className="flex flex-col gap-1">
                <span>{dream.createdBy}</span>
                <span>{getDate()}</span>
              </div>
            </li>
          </ul>
          <ul className="flex gap-2 text-sm">
            <li className="flex gap-1 text-m hover:cursor-pointer items-center justify-center hover:text-red-500 ">
              Report
              <MdOutlineReport className="text-lg" />
            </li>
          </ul>
        </nav>
        <div className="flex flex-col gap-2 p-3">
          <h1 className="font-semibold text-xl">{dream.title}</h1>
          <div className="flex flex-wrap gap-1">
            {dream.topics.map((topic: any, key: any) => (
              <Tag name={topic.topic} custom="bg-teal-500 text-white" />
            ))}
          </div>
          <p className="text-sm">{dream.content}</p>
        </div>
        <img src={dream.pictureUrl} alt="" className="w-fit max-h-full" />
        <nav className="flex justify-between p-1 gap-2 w-full items-center text-xl">
          <ul className={btnStyle}>
            <Favorite dream={dream} auth={auth} />
          </ul>
          <ul  className={btnStyle}>
            <Comment dream={dream} auth={auth} />
          </ul>
          <ul  className={btnStyle}>
            <FaShare /> 
          </ul>
        </nav>
      </div>
    </>
  );
}
