"use client";
import api from "@/api";
import Button from "@/components/button";
import Input from "@/components/input/input";
import { useState, ChangeEvent } from "react";

interface submitCodeProps {
  userId: number;
}

function useSubmitCode(userId: number) {
  const [code, setCode] = useState("");

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCode((prev) => (value.length > 6 ? prev : value));
  };

  const onSubmit = async () => {
    const { data } = await api.post("/auth/confirm-email", {
      userId,
      code,
    });

    if (data) {
      window.location.href = "/login";
    }
  };

  return {
    code,
    onChangeCode,
    onSubmit,
  };
}

export function SubmitCode({ userId }: submitCodeProps) {
  const { code, onChangeCode, onSubmit } = useSubmitCode(userId);
  
  if (!userId) {
    return;
  }

  return (
    <>
      <Input
        name="code"
        value={code}
        className="rounded"
        onChange={onChangeCode}
        placeholder="123456"
      />
      <Button
        onClick={onSubmit}
        className="bg-cyan-700 py-4 rounded text-white"
      >
        Enviar
      </Button>
    </>
  );
}
