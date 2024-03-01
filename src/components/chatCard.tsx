import endPoint from "@services/api"
import axios from "axios"
import { useEffect, useState } from "react"
import { IoCheckmarkOutline } from "react-icons/io5"

export default function ChatCard({chat, user, connect}: {chat:any, user:any, connect:any}){
  const [friend, setFriend] = useState<any>()
  const [last, setLast] = useState<any>()
  useEffect(() => {
    async function getUsers(){
      const {data} = await axios.get(endPoint.users.chats(chat.id))
      setFriend(data.filter((u:any) => u.username !== user.username)[0])
      setLast(chat.messages[chat.messages.length-1])
    }
    getUsers()
  }, [])
  return <>
    <div className="flex items-center gap-3 hover:bg-teal-100 p-3 rounded-lg cursor-pointer" onClick={() => connect(chat.id)}>
      <img src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg" alt="" className="w-10 h-10 rounded-full"/>
      <div className="flex flex-col gap-0 w-full">
        <div className="flex w-full flex-wrap relative">
          <h1>{friend?.name + " "+friend?.lastName}</h1>
          <span className="text-xs self-end absolute top-1 right-2">{new Date(last?.createdAt).getHours()+":"+new Date(last?.createdAt).getMinutes()}</span>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex w-full gap-1">
            <IoCheckmarkOutline />
            <span className="text-xs max-w-lg">{last?.text}</span>
          </div>
        </div>
      </div>
    </div>
  </>
}
