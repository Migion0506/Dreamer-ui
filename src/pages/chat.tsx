import { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useAuth } from "@hooks/useAuth";
import axios from "axios";
import endPoint from "@services/api";
import Message from "@components/message";
import Header from "@components/header";
import ChatCard from "@components/chatCard";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { FaAngleLeft, FaZ } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { RiChatSmile2Fill, RiMenu3Fill } from "react-icons/ri";

export default function Chat() {
  const [chat, setChat] = useState<string>("");
  const [chats, setChats] = useState<any[]>();
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const node = useRef<any>(null);

  const textRef = useRef<any>();
  const { token, user, logout }: any = useAuth();

  useEffect(() => {
    async function getChats() {
      const headers = {
        Authorization: "Bearer " + token,
      };
      const { data: rta } = await axios.get(endPoint.chats.getAll, { headers });
      setChats(rta);
    }
    getChats();
  }, []);

  async function connect(to: string) {
    setChat(to);
    const { data } = await axios.get(endPoint.chats.getOne(to));
    const messagesRta = data.messages.sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setMessages(messagesRta);
    const headers = {
      Authorization: "Bearer " + token,
    };
    const socket = new SockJS("http://localhost:3030/api/v1/chat", {
      transports: ["xhr-streaming"],
      headers,
    });
    const ws = Stomp.over(socket);
    setSocket(ws);
    ws.connect(
      headers,
      (frame: any) => {
        setConnected(true);
        ws.subscribe(`/topic/messages/${to}`, (message: any) => {
          setMessages((old) => [...old, JSON.parse(message.body)]);
        });
        ws.subscribe(`/topic/delete/${to}`, (message: any) => {
          const body = JSON.parse(message.body);
          setMessages(messages.filter((element) => element.id !== body.id));
        });
      },
      headers
    );
  }
  function disconnect(){
    socket.disconnect()
    setSocket(null)
    setChat('')
    setMessages([])
    setConnected(false)
  }
  function sendMessage(e: any) {
    e.preventDefault();
    const text = textRef.current?.value;
    const headers = {
      Authorization: "Bearer " + token,
    };
    socket.send(`/app/chat/${chat}/send`, headers, JSON.stringify({ text }));
    textRef.current.value = "";
  }

  return (
    <>
      <Header user={user} logout={logout} />
      <div className="flex flex-col gap-2 w-full h-[89vh] lg:flex-row">
        <div className="w-1/3 h-full flex flex-col gap-5 p-2">
          <header className="inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-3 w-full lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <RiChatSmile2Fill className="h-8 w-8" />
                </button>
              </div>
              <div className="hidden w-full lg:flex lg:flex-col lg:gap-x-12">
                {chats?.map((room, key) => (
                  <ChatCard
                    chat={room}
                    user={user}
                    key={key}
                    connect={connect}
                    disconnect={disconnect}
                  />
                ))}
              </div>
            </nav>
            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">BrandBeru</span>
                    <RiChatSmile2Fill className="h-8 w-8" />
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <FaAngleLeft />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y gap-3 divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {chats?.map((room, key) => (
                        <ChatCard
                          chat={room}
                          user={user}
                          key={key}
                          connect={connect}
                          disconnect={disconnect}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
        </div>
        {connected ? (
          <div className="flex-1 border-l-2 border-l-gray-500 shadow-sm flex flex-col justify-end items-center min-h-full">
            <ul
              ref={node}
              className="w-full h-full overflow-auto flex flex-col gap-1 p-2"
            >
              {messages.map((message, key) => (
                <Message
                  chatId={chat}
                  socket={socket}
                  message={message}
                  key={key}
                />
              ))}
            </ul>
            <form
              onSubmit={sendMessage}
              className="w-full h-12 flex justify-center items-center sticky bottom-0"
            >
              <input
                ref={textRef}
                type="text"
                className="w-full h-full outline-none border-0 border-t-2 border-b-gray-500 "
                autoComplete="off"
                required
              />
              <button
                type="submit"
                className="block p-2 bg-teal-500 h-full text-white md:hidden"
              >
                <AiOutlineSend className="text-2xl" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 border-l-2 border-l-gray-500 shadow-sm flex flex-col justify-center items-center">
            <h1>This is the Dreamer chat</h1>
            <p className="font-thin text-sm">
              Choose one of your contacts to stablish a conversation.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
