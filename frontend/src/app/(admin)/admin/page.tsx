"use client";
import Loading from "@/components/loading";
import { Server } from "@/constants/server";
import useApiPrivate from "@/hooks/apiPrivate";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as S from "./style";

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
  const router = useRouter();
  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-auto flex flex-wrap p-3 mt-6">
      <div className="flex mx-auto">
        {users?.map((user: User) => (
          <S.UserComponent 
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push(`/admin/details/${user.id}`)}
          className="flex flex-col p-2 shadow hover:shadow-xl transition-shadow" key={user.id}>
            <div className="w-[12rem] h-[12rem] flex relative rounded overflow-hidden">
              <Image
                className="hover:scale-[1.1] transition-all"
                src={`${Server}/uploads/${user?.photo}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                fill
                quality={50}
                style={{ objectFit: 'cover' }}
                alt="Foto do cliente"
              />
            </div>
            <div className="flex text-lg opacity-90">{user.firstName}</div>
          </S.UserComponent>
        ))}
      </div>
    </div>
  );
}
