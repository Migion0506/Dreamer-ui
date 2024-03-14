import Separator from "@common/separator";
import DreamCard from "@components/dreamCard";
import Header from "@components/header";
import NavCreate from "@components/navCreate";
import { useAuth } from "@hooks/useAuth";
import useFetch from "@hooks/useFetch";
import endPoint from "@services/api";
import {motion} from "framer-motion"

function Home() {
  const auth:any = useAuth()
  const dreams = useFetch(endPoint.dreams.get, [])
  return <>
    <motion.div transition={{opacity:0, delay:1, type:"spring", x:"100vw"}} initial={{opacity:1,x:"0vw"}} exit={{opacity:0}} className="flex flex-col items-center justify-center py-2 gap-3 bg-[#e9e9e9]">
      <div className="flex flex-col items-center justify-center py-2 gap-3 max-w-lg">
        <NavCreate user={auth?.user} />
        <Separator />
        {dreams?.sort((a:any,b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())?.map((dream:any) => <DreamCard key={dream.id} dream={dream} auth={auth} />)}
      </div>
    </motion.div>
  </>
}

export default Home
