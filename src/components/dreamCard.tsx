import { FaShare, FaUser } from "react-icons/fa";
import Favorite from "./favorite";
import Comment from "./comments";
import { MdOutlineReport } from "react-icons/md";
import Tag from "@common/tag";
import { enUS } from "date-fns/locale";
import { formatDistance, subDays } from "date-fns";
import endPoint from "@services/api";
import useFetch from "@hooks/useFetch";
import { motion } from "framer-motion";

export default function DreamCard({ dream, auth }: { dream: any; auth: any }) {
  const btnStyle = "w-full h-full rounded-lg flex justify-center"
  const creator = useFetch(endPoint.users.findOne(dream?.createdBy))
  function getDate() {
    const date = new Date(dream.createdAt);
    return formatDistance(subDays(date, 0), new Date(), { locale: enUS });
  }
  return (
    <>
      <motion.div layout style={
        {
          borderRadius: 15
        }
      } whileHover={
        {
          scale:1.2,
          transition: { duration: 0.3 }
        }
      } className="flex flex-col gap-2 bg-white duration-300 transition w-full shadow-lg">
        <nav className="flex justify-between gap-2 pt-3 px-3">
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
                <span>{creator?.name + " " + creator?.lastName}</span>
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
        <div className="flex flex-col gap-2 py-1 px-3">
          <h1 className="font-semibold text-xl">{dream.title}</h1>
          <p className="text-sm">{dream.content}</p>
          <div className="flex flex-wrap gap-1">
            {dream.topics.map((topic: any, key: any) => (
              <Tag key={key} name={topic.topic} custom="bg-teal-500 text-white" />
            ))}
          </div>
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
      </motion.div>
    </>
  );
}
