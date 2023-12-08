import Link from "next/link";
import * as S from "../style";
import { IoHome } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";

const links = {
  home: { path: "/finance/", icon: IoHome },
  reminder: { path: "/finance/", icon: CiCircleList },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 w-full h-full">
      <S.OptionsOfPageRegisters
        initial={{ x: -40 }}
        animate={{ x: 0 }}
        className="flex my-auto items-center fixed flex-col justify-center rounded-xl"
      >
        <div className="w-full p-3 gap-3 h-full flex-1 flex-col flex relative overflow-hidden">
          <S.Bubble />
          {Object.entries(links).map(([name, value]: any) => {
            const { path, icon: Icon } = value;
            return (
              <Link
                href={path}
                key={name}
                className="h-10 w-10 flex justify-center items-center rounded opacity-60 hover:opacity-100"
              >
                <Icon />
              </Link>
            );
          })}
        </div>
      </S.OptionsOfPageRegisters>
      {children}
    </div>
  );
}
