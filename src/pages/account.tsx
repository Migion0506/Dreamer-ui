import Header from "@components/header";
import { useAuth } from "@hooks/useAuth";

export default function Account(){
  const auth:any = useAuth()
  return <>
    <Header user={auth.user} logout={auth.logout}/>
  </>
}
