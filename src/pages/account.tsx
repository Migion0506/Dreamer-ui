import AccountPage from "@components/accountPage";
import { useAuth } from "@hooks/useAuth";
import useFetch from "@hooks/useFetch";
import endPoint from "@services/api";

export default function Account() {
  const user:any = useFetch(endPoint.users.account)
  return <AccountPage user={user} />
}
