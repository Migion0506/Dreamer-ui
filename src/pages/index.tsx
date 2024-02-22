import DreamCard from "@components/dreamCard";
import Header from "@components/header";
import { useAuth } from "@hooks/useAuth";

export default function Home() {
  const auth:any = useAuth()
  return <>
    <Header user={auth.user} logout={auth.logout} />
    <div className="flex flex-col items-center justify-center py-2 gap-3">
      <div className="flex flex-col items-center justify-center py-2 gap-3 max-w-lg">
        <DreamCard />
        <hr className="bg-black w-full h-[2px]" />
        <DreamCard />
      </div>
    </div>
  </>
}
