"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { RoleButtons } from "./ButtonSelect";

function useSelect() {
  const { push } = useRouter();

  const [optionBase, setOptionBase] = useState<string | undefined>(
    Cookies.get("adminRote")
  );

  const handleOptionSelect = (option: string) => {
    setOptionBase(option);

    if (option === "home") {
      Cookies.set("adminRote", "user");
      push("/home");
    }

    if (option === "admin") {
      Cookies.set("adminRote", "admin");
      push("/admin");
    }
  };

  return {
    handleOptionSelect,
  };
}

export default function Select() {
  const { handleOptionSelect } = useSelect();

  return <RoleButtons onOptionSelect={handleOptionSelect} />;
}
