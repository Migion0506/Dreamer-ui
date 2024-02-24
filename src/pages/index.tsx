import DreamCard from "@components/dreamCard";
import Header from "@components/header";
import { useAuth } from "@hooks/useAuth";

function Home() {
  const auth:any = useAuth()

  console.log(auth)

  return <>
    <Header user={auth?.user} logout={auth?.logout} />
    <div className="flex flex-col items-center justify-center py-2 gap-3">
      <div className="flex flex-col items-center justify-center py-2 gap-3 max-w-lg">
        {auth?.dreams?.map((dream:any) => <DreamCard key={dream.id} dream={dream} auth={auth} />)}
      </div>
    </div>
  </>
}

export default Home
