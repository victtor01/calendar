import { MdAdminPanelSettings } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { fontOpenSans } from "@/app/fonts";
import Button from "@/components/button";

interface RoleButtonsProps {
  onOptionSelect: (option: string) => void;
}

export function RoleButtons({ onOptionSelect }: RoleButtonsProps) {
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center bg-zinc-800 ${fontOpenSans}`}
    >
      <div className="flex gap-1">
        <Button
          onClick={() => onOptionSelect("home")}
          className=" transition-all duration-600 p-2 flex-1 flex w-auto flex-col gap-2 rounded opacity-70 hover:opacity-100 cursor-pointer hover:scale-[1.1]"
        >
          <div className=" bg-none hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 w-[8rem] h-[8rem] bg-zinc-900 flex items-center justify-center rounded-[100%]">
            <BsFillPersonFill size="60" color="white" />
          </div>
          <span className="flex items-center justify-center w-full">
            Usuário
          </span>
        </Button>
        <Button
          onClick={() => onOptionSelect("admin")}
          className="transition-all duration-600 p-2 flex-1 flex w-auto flex-col gap-2 rounded opacity-70 hover:opacity-100 cursor-pointer hover:scale-[1.1]"
        >
          <div className="hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 w-[8rem] h-[8rem] bg-zinc-900 flex items-center justify-center rounded-[100%]">
            <MdAdminPanelSettings size="60" color="white" />
          </div>
          <span className="flex items-center justify-center w-full">Admin</span>
        </Button>
      </div>
    </div>
  );
}
