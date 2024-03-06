import { Popover, Transition } from "@headlessui/react";
import { useAuth } from "@hooks/useAuth";
import { Fragment, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Message({
  message,
  chatId,
  socket,
}: {
  message: any;
  chatId: string;
  socket: any;
}) {
  const auth: any = useAuth();
  const isOwn = message.createdBy === auth.user.username;
  const alignment = isOwn
    ? "self-end bg-teal-500 text-white shadow-md"
    : "self-start border-2 border-gray-200 shadow-md text-gray-800";
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    console.log(alignment);
  }, []);

  const deleteHandle = () => {
    const headers = {
      Authorization: "Bearer " + auth.token,
    };
    console.log(message, chatId);
    delete message.createdAt;
    socket.send(`/app/chat/${chatId}/delete`, headers, JSON.stringify(message));
  };
  return (
    <>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          setShowMenu(!showMenu);
        }}
        className={
          "flex flex-col gap-1 rounded-lg p-2 w-fit max-w-lg relative " +
          alignment
        }
      >
        {isOwn && (
          <Popover className="absolute top-2 right-1">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <CiMenuKebab className="h-5 w-5 text-white" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-20 flex max-w-fit -translate-x-28 px-4">
                <div className="flex flex-col gap-y-2 bg-white rounded-lg shadow-lg cursor-pointer">
                  <div className="px-4 rounded-t-lg py-2 text-sm font-semibold text-gray-900 hover:bg-blue-500 hover:text-white flex gap-2 items-center">
                    <MdEdit />
                    Edit
                  </div>
                  <div
                    onClick={deleteHandle}
                    className="px-4 rounded-b-lg py-2 text-sm font-semibold text-gray-900 hover:bg-red-500 hover:text-white flex gap-2 items-center"
                  >
                    <MdDelete />
                    Delete
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
        <p className=" mr-4">{message.text}</p>
        <div className="flex gap-1 text-xs self-end justify-center items-center">
          <span className="">
            {new Date(message.createdAt).getHours() +
              ":" +
              new Date(message.createdAt).getMinutes()}
          </span>
          <span>
            <IoCheckmarkOutline />
          </span>
        </div>
      </div>
    </>
  );
}
