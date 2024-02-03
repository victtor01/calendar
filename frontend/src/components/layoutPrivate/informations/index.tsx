import { fontRoboto } from "@/app/fonts";
import Todo from "@/components/todo";
import { Server } from "@/constants/server";
import { useSessionContext } from "@/contexts/sessionContext";
import Image from "next/image";
import { GoGear } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Income } from "./income";
import Link from "next/link";

const data: any = [];
for (let i = 0; i < 10; i++) {
  data.push({
    name: `name-[i]`,
    value: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
  });
}

export default function Information() {
  const { userInfo } = useSessionContext();

  return (
    <div
      style={{ gridArea: "user" }}
      className="bg-transparent py-4 px-2 flex flex-col mx-5 gap-4 w-[18rem] z-10"
    >
      <div className="flex flex-col gap-2">
        <header className="flex justify-between gap-20">
          <div className="bg-gradient-45 border-2 border-zinc-600 shadow-inner from-purple-600 to-blue-600 w-14 h-14 relative rounded-full overflow-hidden opacity-90">
            <Image
              src={`${Server}/uploads/${userInfo.photo}`}
              sizes="(max-width: 2rem) 2rem, 1200px"
              fill
              quality={100}
              style={{ objectFit: "cover" }}
              alt="Foto do usuario"
            />
          </div>
          <div className="flex gap-5 py-1">
            <Link href={"/configurations"}>
              <GoGear size="20" />
            </Link>
            <IoClose size="20" />
          </div>
        </header>
        <section
          className={`flex flex-col text-gray-600 font-semibold dark:text-white gap-[-2rem] ${fontRoboto}`}
        >
          <h1 className="text-xl">{userInfo?.firstName}</h1>
          <p>{userInfo?.email}</p>
        </section>
      </div>

      <section className="gap-3 flex-col  rounded flex text-gray-800 dark:text-gray-300">
        <div className="flex flex-col h-auto hover:scale-[1.04] transition-all w-full bg-blue-50 rounded-xl  dark:bg-zinc-950 shadow hover:shadow-xl">
          <header className="font-semibold  p-2 px-4 ">Anotações</header>
          <section className="flex flex-col px-3  overflow-auto scroll-none h-auto max-h-[15rem] ">
            <Todo />
          </section>
        </div>

        <h2 className="text-lg font-semibold text-zinc-500 dark:text-zinc-200">
          Rendimentos hoje
        </h2>

        <Income />
      </section>
    </div>
  );
}
