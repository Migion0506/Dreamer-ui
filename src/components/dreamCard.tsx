import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots, FaShare, FaUser } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";

export default function DreamCard(){
  return <div className="flex flex-col gap-2 p-2 hover:bg-slate-200 rounded-lg">
    <nav className="flex justify-between gap-2">
      <ul className="flex gap-2 text-sm items-center justify-center">
        <li><FaUser /></li>
        <li>brandberu</li>
        <hr className="bg-gray-600 h-1 w-1 rounded-full"/>
        <li>10 hr ago</li>
      </ul>
      <ul className="flex gap-2 text-sm items-center justify-center">
        <li className="bg-blue-500 p-1 rounded-lg text-slate-100">Follow</li>
        <li className="text-lg hover:cursor-pointer hover:text-red-500 "><MdOutlineReport /></li>
      </ul>
    </nav>
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-xl">Dream Title here</h1>
      <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias aliquid, necessitatibus eum aperiam distinctio architecto non? Libero, odio. Facilis repudiandae numquam expedita consequuntur debitis nobis quaerat magni beatae sint at!</p>
    </div>
    <nav className="flex justify-between gap-2">
      <ul className="flex gap-2  items-center justify-center text-lg">
        <li><AiOutlineLike /></li>
        <li><AiOutlineDislike /></li>
        <li><FaRegCommentDots /></li>
      </ul>
      <ul className="flex gap-2 text-lg items-center justify-center">
        <li><FaShare /></li>
      </ul>
    </nav>
  </div>
}
