import Separator from "@common/separator";
import DreamCard from "@components/dreamCard";
import Header from "@components/header";
import NavCreate from "@components/navCreate";
import useFollow from "@hooks/useFollow";
import { useAuth } from "@hooks/useAuth";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PiPlugsConnected } from "react-icons/pi";
import { VscDebugDisconnect } from "react-icons/vsc";

export default function AccountPage({ user }: { user: any }) {
  const auth: any = useAuth();
  const follow = useFollow(auth.user, user)
  const editFollow = () => {
    return isAccount() ? (
      <button className="bg-teal-500 text-gray-50 p-2 rounded-lg">
        Edit profile
      </button>
    ) : (
        <button onClick={follow.followHandler} className={"bg-transparent border-2 border-gray-300 text-gray-800 shadow-lg p-2 flex justify-center gap-1 rounded-lg duration-300 hover:border-white " + (follow.connect ? 'text-red-500 hover:text-white hover:bg-red-500' : 'text-gray-800 hover:text-white hover:bg-teal-500')}>
            {!follow.connect ? <PiPlugsConnected className="w-6 h-6" /> : <VscDebugDisconnect className="w-6 h-6" /> }
            {!follow.connect ? "Connect": "Disconnect"}
        </button>
    );
  };
  const isAccount = () => {
    return user?.username === auth?.user?.username
  }
  return (
    <>
      <div className="flex flex-wrap justify-center gap-10 items-start p-5">
        <div className="flex flex-col gap-3 max-w-fit">
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
            {editFollow()}
          <div className="flex flex-wrap justify-between w-full">
            <span className="flex gap-2 justify-center items-center">
              {user?.followers?.length + " Followers"} <FaChevronRight />
            </span>
            <span className="flex gap-2 justify-center items-center">
              <FaChevronLeft /> {user?.followings?.length + " Following"}
            </span>
          </div>
          <Separator />
        </div>
        <div className="flex flex-col gap-2 max-w-lg justify-start items-start">
          {isAccount() && <NavCreate user={auth?.user} />}
          <Separator />
          {user?.dreams?.map((dream: any) => (
            <DreamCard key={dream.id} dream={dream} auth={auth} />
          ))}
        </div>
      </div>
    </>
  );
}
