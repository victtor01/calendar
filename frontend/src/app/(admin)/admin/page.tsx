"use client";
import Loading from "@/components/loading";
import useApiPrivate from "@/hooks/apiPrivate";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as S from './style';

const useAdmin = () => {
  const api = useApiPrivate();
  const getUsers = async () => (await api.get("/users")).data;

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const router = useRouter();

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    router.push("/login");
  };

  return { users, isLoading, logout };
};

export default function Admin() {
  const { users, isLoading, logout } = useAdmin();

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-auto flex flex-wrap p-3">
      {users?.map((user: User) => (
        <div className="flex flex-col bg-green-200 p-2" key={user.id}>
          <div className="w-[12rem] h-[12rem] flex bg-red-200"></div>
          <div className="flex">{user.firstName}</div>
        </div>
      ))}
    </div>
  );
}
