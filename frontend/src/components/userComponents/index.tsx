import { IoMdExit, IoMdNotificationsOutline } from "react-icons/io";
import Button from "../button";
import { IoExitOutline } from "react-icons/io5";
import { fontOpenSans, fontRoboto } from "@/app/fonts";
import { useState } from "react";

type Select = "NOTIFICATION" | "EXIT" | "USER" | null;

export default function UserComponents() {
  const [selected, setSelected] = useState<Select>(null);
  const handleSelected = (value: Select) =>
    setSelected((prev: Select) => {
      return prev === value ? null : value;
    });

  return (
    <div className={`flex gap-2 p-2 items-center gap-3 ${fontRoboto}`}>
      <Button
        onClick={() => handleSelected("NOTIFICATION")}
        className={`flex p-2 rounded-full h-10 w-10 items-center gap-2 justify-center ${
          selected === "NOTIFICATION" ? "bg-cyan-500 text-white" : "transparent"
        } transition-background`}
      >
        <IoMdNotificationsOutline size="20" />
      </Button>
      <Button
        onClick={() => handleSelected("EXIT")}
        className={`flex p-2 rounded-full justify-center h-10 w-10 items-center gap-2 ${
          selected === "EXIT" ? "bg-cyan-500 text-white" : "transparent"
        } transition-background`}
      >
        <IoMdExit size="20" />
      </Button>
      <Button
        className="flex bg-cyan-500 relative h-10 w-10 items-center overflow-hidden rounded-full"
        style={{
          backgroundImage: 'url("persson2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
