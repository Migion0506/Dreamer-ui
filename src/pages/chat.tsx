import { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

export default function Chat() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState<string | undefined>("")
  const [socket, setSocket] = useState<any>()
  const [messages, setMessages] = useState<any[]>([])

  const textRef = useRef<any>();
  const userRef = useRef<HTMLInputElement>(null);

  function connect(e: any) {
    e.preventDefault()
    const socket = new SockJS("http://localhost:3030/api/v1/chat");
    const ws = Stomp.over(socket);
    setSocket(ws)
    setUser(userRef.current?.value)
    ws.connect({}, (frame: any) => {
      setConnected(true);
      ws.subscribe("/topic/messages", (message: any) => {
        setMessages((prev: any) => [...prev, JSON.parse(message.body)])
      });
    });

  }
  function sendMessage(e: any) {
    e.preventDefault()
    const text = textRef.current?.value;
    console.log(text)
    socket.send("/app/chat", {}, JSON.stringify({ text: text, from: user }))
    textRef.current.value = ""
  }

  return connected ? (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <ul className="w-full h-full flex flex-col gap-1 justify-end items-start p-2">
          {messages.map((message, key) => (
            <div className="w-full flex justify-start gap-2" key={key}>
              <span className="text-teal-500">{message.from+":"}</span>
              <span>{message.text}</span>
            </div>
          ))}
        </ul>
        <form onSubmit={sendMessage} className="w-full h-16 flex justify-center p-2 items-center absolute bottom-0 gap-5">
          <input ref={textRef} type="text" className="w-full h-full rounded-lg " autoComplete="off" />
          <button  type="submit" className="bg-teal-500 text-white px-3 py-2 rounded-lg text-xl">
            <AiOutlineSend />
          </button>
        </form>
      </div>
    </>
  ) : (
    <>
      <div className="w-full h-full flex-col flex justify-center items-center p-2 gap-3">
        <input ref={userRef} placeholder="Username:" type="text" className="w-full rounded-lg p-2" autoComplete="off" />
        <button onClick={connect} className="text-black p-2 bg-teal-500">Connect</button>
      </div>
    </>
  );
}
