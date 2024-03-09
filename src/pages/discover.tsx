import Header from "@components/header";
import ProfileCard from "@components/profileCard";
import { useAuth } from "@hooks/useAuth";
import useFetch from "@hooks/useFetch";
import endPoint from "@services/api";

export default function Discover() {
  const { user }: any = useAuth();
  const users:any = useFetch(endPoint.users.discover)
  return (
    <>
      <div className="flex flex-wrap items-center justify-center py-2 gap-5 w-full h-full bg-gray-200 min-h-[92vh]">
        {users?.filter((u:any) => u.username !== user.username).map((user:any) => (
            <ProfileCard user={user} key={user?.username} />
        ))}
      </div>
    </>
  );
}
