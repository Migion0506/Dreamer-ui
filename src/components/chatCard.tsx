import { Popover, Transition } from "@headlessui/react";
import { useAuth } from "@hooks/useAuth";
import endPoint from "@services/api";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdClose, MdDelete } from "react-icons/md";

export default function ChatCard({
  chat,
  user,
  connect,
  disconnect,
}: {
  chat: any;
  user: any;
  connect: any;
  disconnect: any;
}) {
  const [friend, setFriend] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const { setAlert }: any = useAuth();
  useEffect(() => {
    async function getUsers() {
      const { data } = await axios.get(endPoint.users.chats(chat.id));
      setFriend(data.filter((u: any) => u.username !== user.username)[0]);
      setMessages(chat.messages.sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ))
    }
    getUsers();
  }, []);
  async function deleteHandle() {
    try {
      const { data } = await axios.delete(endPoint.chats.delete(chat.id));
      console.log(data);
      setAlert({
        active: true,
        message: "Chat deleted successfully",
        type: "success",
        autoClose: true,
      });
      window.location.reload();
    } catch (error: any) {
      setAlert({
        active: true,
        message: "Error: " + error.message,
        type: "error",
        autoClose: true,
      });
    }
  }

  return (
    <>
      <div
        className="flex items-center gap-3 hover:bg-teal-100 p-3 rounded-lg cursor-pointer"
        onClick={() => connect(chat.id)}
      >
        <img
          src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col gap-0 w-full">
          <div className="flex w-full flex-wrap relative">
            <h1>{friend?.name + " " + friend?.lastName}</h1>
            <span className="text-xs self-end absolute top-1 right-2">
              {new Date(messages[messages.length - 1]?.createdAt).getHours() +
                ":" +
                new Date(messages[messages.length - 1]?.createdAt).getMinutes()}
            </span>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex w-full gap-1">
              <IoCheckmarkOutline />
              <span className="text-xs max-w-lg">{messages[messages.length - 1]?.text}</span>
            </div>
          </div>
        </div>
        <div>
          <Popover>
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <CiMenuKebab className="h-5 w-5 text-black" aria-hidden="true" />
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
              <Popover.Panel className="absolute z-20 flex max-w-fit -translate-x-20 px-4">
                <div className="flex flex-col gap-y-2 bg-white rounded-lg shadow-lg cursor-pointer">
                  <div
                    onClick={deleteHandle}
                    className="px-4 rounded-t-lg py-2 text-sm font-semibold text-gray-900 hover:bg-red-500 hover:text-white flex gap-2 items-center"
                  >
                    <MdDelete />
                    Delete
                  </div>
                  <div
                    onClick={() => disconnect()}
                    className="px-4 rounded-b-lg py-2 text-sm font-semibold text-gray-900 hover:bg-red-500 hover:text-white flex gap-2 items-center"
                  >
                    <MdClose />
                    Close chat
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </>
  );
}
