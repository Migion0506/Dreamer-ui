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

export default function Chat() {
  const [chat, setChat] = useState<string>("");
  const [chats, setChats] = useState<any[]>()
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);

  const [active, setActive] = useState(true)

  const node = useRef<any>(null);

  const textRef = useRef<any>();
  const { token, user, logout }: any = useAuth();

  useEffect(() => {
    async function getChats() {

      const headers = {
        Authorization: "Bearer " + token,
      };
      const {data:rta} = await axios.get(endPoint.chats.getAll, {headers})
      setChats(rta)
    }
      getChats();
  }, []);

  async function connect(to:string) {
    setChat(to)
    const { data } = await axios.get(endPoint.chats.getOne(to));
    const messagesRta = data.messages.sort((a:any,b:any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
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
        ws.subscribe(`/topic/messages/${chat}`, (message: any) => {
          setTimeout(() => {
            setActive(true)
          }, 2000)
          setMessages((old) => [...old, JSON.parse(message.body)])
        });
        ws.subscribe(`/topic/delete/${chat}`, (message: any) => {
          const body = JSON.parse(message.body);
          setMessages(messages.filter((element) => element.id !== body.id));
        });
      },
      headers
    );
  }
  function sendMessage(e: any) {
    e.preventDefault();
    if(!active){
      return;
    }
    const text = textRef.current?.value;
    const headers = {
      Authorization: "Bearer " + token,
    };
    socket.send(`/app/chat/${chat}/send`, headers, JSON.stringify({ text }));
    textRef.current.value = "";
    setActive(false);
  }

  return (
    <>
      <Header user={user} logout={logout} />
      <div className="flex flex-col gap-2 w-full h-[89vh] lg:flex-row">
        <div className="w-1/3 h-full flex flex-col gap-5 p-2">
          {chats?.map((room, key) => (
            <ChatCard chat={room} user={user} key={key} connect={connect} />
          ))}
        </div>
        {connected ? <div className="flex-1 border-l-2 border-l-gray-500 shadow-sm flex flex-col justify-end items-center">
          <ul
            ref={node}
            className="w-full h-[80vh] overflow-auto flex flex-col gap-1 p-2"
          >
            {messages
              .map((message, key) => (
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
            className="w-full h-12 flex justify-center items-center"
          >
            <input
              ref={textRef}
              type="text"
              className="w-full h-full outline-none border-0 border-t-2 border-b-gray-500 "
              autoComplete="off"
              required
            />
            <button type="submit" className="block p-2 bg-teal-500 h-full text-white rounded-lg md:hidden">
              <AiOutlineSend className="text-2xl" />
            </button>
          </form>
        </div>
        :
        <div className="flex-1 border-l-2 border-l-gray-500 shadow-sm flex flex-col justify-center items-center">
          <h1>This is the Dreamer chat</h1>
          <p className="font-thin text-sm">Choose one of your contacts to stablish a conversation.</p>
        </div>
      }
      </div>
    </>
  )
}
