'use client'
import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input/input";
import { fontRoboto, fontOpenSans } from "@/app/fonts";
import { MdMail } from "react-icons/md";

export default function Login() {
  return (
    <Form
      className={`rounded mt-20 max-w-[27rem] min-h-[40rem] ${fontOpenSans}`}
    >
      <div className="flex flex-col mb-4 gap-1">
        <div className={`text-[2rem] w-full text-cyan-500 ${fontRoboto}`}>
          Login
        </div>
        <div className={`text-[1.2rem] font-semibold opacity-70`}>
          Bem vindo de volta! Faça o login digitando seu email logo abaixo.
        </div>
      </div>
      <Input
        required
        className={`border focus:border-cyan-500 rounded `}
      >
        <div className="absolute z-10 right-4 pointer-events-none ">
          <MdMail className="opacity-40" size="20" />
        </div>
        <span>Email</span>
      </Input>
      <Button className="bg-gradient-to-r from-cyan-300 to-cyan-400 w-full py-4 text-gray-700 font-normal text-lg rounded font-semibold">
        Entrar
      </Button>
    </Form>
  );
}
