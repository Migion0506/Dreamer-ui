import { Popover, Transition } from "@headlessui/react";
import { useAuth } from "@hooks/useAuth";
import endPoint from "@services/api";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { formatRelative, formatDistance, subDays } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { Fragment, useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdClose, MdDelete } from "react-icons/md";
import SockJS from "sockjs-client";

export default function ChatCard({
  chat,
  setChat,
  ws,
  user,
  lastMessage,
  setConnected,
  connect,
  token
}: {
  chat: any;
  setChat: any;
  ws: any;
  user: any;
  connect:any,
  lastMessage:any,
  setConnected:any,
  token:any
}) {
  const [friend, setFriend] = useState<any>();
  const [message, setMessage] = useState<any>("");
  const [date, setDate] = useState<any>("");
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const { setAlert }: any = useAuth();
  useEffect(() => {
    connect(chat.id);
    async function getUsers() {
      const { data } = await axios.get(endPoint.users.chats(chat.id));
      setFriend(data.filter((u: any) => u.username !== user.username)[0]);
      setMessage(lastMessage[lastMessage.length-1]);
      setDate(formatDistance(new Date(lastMessage[lastMessage.length-1]?.createdAt || chat.createdAt), new Date()));
    }
    getUsers();
    connectLocalChat(chat.id)
  }, []);
  async function connectLocalChat(to: string) {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const lsocket = new SockJS("http://localhost:3030/api/v1/chat", {
      transports: ["xhr-streaming"],
      headers,
    });
    subscriptions.forEach(sub => sub.unsubscribe())
    setSubscriptions([])
    const ws = Stomp.over(lsocket);
    ws.connect(
      headers,
      (frame: any) => {
        const messageSub = ws.subscribe(`/topic/messages/${to}`, (message: any) => {
          setMessage(JSON.parse(message.body));
          const date = JSON.parse(message.body).createdAt
          setDate(formatDistance(new Date(date), new Date()));
        });
        // const deleteSub = ws.subscribe(`/topic/delete/${to}`, (message: any) => {
        //   const body = JSON.parse(message.body);
        //   const filter:any[] = messages.filter((element) => element.id !== body.id)
        //   setMessages(filter);
        // });
        setSubscriptions([messageSub])
      },
      headers
    );
  }
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

  const getChatDate = () => {
    const date = chat?.createdAt;
    return formatRelative(subDays(date, 0), new Date(), { locale: enUS });
  };

  return (
    <>
      <div
        className="flex items-center gap-3 hover:bg-teal-100 p-3 rounded-lg cursor-pointer"
        onClick={() => {setChat(chat.id); setConnected(true)}}
      >
        <img
          src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg"
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col gap-0 w-full">
          <h1 className="overflow-none w-full min-w-10 whitespace-nowrap truncate">
            {friend?.name + " " + friend?.lastName}
          </h1>
          <div className="flex flex-col w-full">
            <div className="flex w-full gap-1">
              <IoCheckmarkOutline />
              <span className="text-xs w-full">
                {message?.text}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs self-start w-fit text-nowrap">
          {message?.text != 0 ? date : getChatDate()}
        </span>
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
