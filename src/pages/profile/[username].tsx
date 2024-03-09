import AccountPage from "@components/accountPage";
import { useAuth } from "@hooks/useAuth";
import useFetch from "@hooks/useFetch";
import endPoint from "@services/api";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState<any>()
    const router = useRouter()
    useEffect(() => {
        if(!router.isReady) return;
        async function fetchUser(){
            const {username} = router.query
            const {data}:any = await axios.get(endPoint.users.findOne(username?.toString()))
            setUser(data)
        }
        fetchUser()
    }, [router.isReady])
  return <>
    <AccountPage user={user} />
  </>;
}
