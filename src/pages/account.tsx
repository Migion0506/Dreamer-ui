import Separator from "@common/separator";
import DreamCard from "@components/dreamCard";
import Header from "@components/header";
import { useAuth } from "@hooks/useAuth";
import useFetch from "@hooks/useFetch";
import endPoint from "@services/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

export default function Account() {
  const auth: any = useAuth();
  const user:any = useFetch(endPoint.users.account)
  return (
    <>
      <Header user={user} logout={auth.logout} />
      <div className="flex flex-wrap justify-center gap-10 items-start p-5">
        <div className="flex flex-col gap-2 max-w-fit">
          <img
            className="h-64 w-64 rounded-full"
            src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg"
            alt=""
          />
          <h1 className="font-semibold text-xl">
            {user?.name + " " + user?.lastName}
          </h1>
          <span>{user?.username + " - " + user?.gender}</span>
          <p className="text-wrap max-w-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            sapiente doloremque, doloribus nobis labore molestiae ipsum sunt ut
            eveniet id accusantium quae magni possimus quos illum quam aliquid
            error laborum!
          </p>
          <button className="bg-teal-500 text-gray-50 p-2 rounded-lg">
            Edit profile
          </button>
          <div className="flex flex-wrap justify-between w-full">
            <span className="flex gap-2 justify-center items-center">
              {7 + " Followers"} <FaChevronRight />
            </span>
            <span className="flex gap-2 justify-center items-center">
              <FaChevronLeft /> {7 + " Following"}
            </span>
          </div>
          <Separator />
        </div>
        <div className="flex flex-col gap-2 max-w-lg justify-start items-start">
          <div className="flex backdrop-blur-3xl bg-white/30 w-full px-5 border-b sm:pt-4 gap-5  justify-between pb-2 items-center">
            <div className="">
              <h1 className="text-xl font-semibold">Your Dreams</h1>
            </div>
            <div className="flex-none">
              <a
                href="/create-dream"
                className="text-xs font-medium px-4 py-2.5 rounded-full hover:opacity-100 hover:shadow-sm bg-teal-500 text-white flex gap-1"
              >
                <span className="flex items-center space-x-2 rounded-md group hover:rounded-full transition hover:text-neutral-50/75">
                  <MdAdd className="text-base" />
                  <span>New Dream</span>
                </span>
              </a>
            </div>
          </div>
          {user?.dreams?.map((dream: any) => (
            <DreamCard key={dream.id} dream={dream} auth={auth} />
          ))}
        </div>
      </div>
    </>
  );
}
