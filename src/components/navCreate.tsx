import Link from "next/link";
import { MdAdd } from "react-icons/md";

export default function NavCreate({ user }: { user: any }) {
  return (
    <>
      <div className="flex w-full gap-3 justify-center items-center">
        <Link href="/account">
          <img src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg" className="w-12 h-12 rounded-full" alt="" />
        </Link>
        <Link
          href="/create-dream"
          className="w-full cursor-text bg-gray-300 rounded-full hover:bg-gray-200 text-gray-500 duration-300"
        >
          <div className="flex bg-white/30 w-full p-3 gap-5 justify-between items-center">
            <h1 className="text-normal font-light">
              What did you dream, {user.name}?
            </h1>
          </div>
        </Link>
      </div>
    </>
  );
}
