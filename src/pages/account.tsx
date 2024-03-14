import AccountPage from "@components/accountPage";
import { useAuth } from "@hooks/useAuth";
import useFetch from "@hooks/useFetch";
import endPoint from "@services/api";

export default function Account() {
  const {user}:any = useAuth()
  return <AccountPage user={user} />
}
