"use client";
import { Button } from "@nextui-org/react";
import Form from "@/components/form";
import Input from "@/components/input/input";
import { fontRoboto, fontOpenSans } from "@/app/fonts";
import { MdMail } from "react-icons/md";
import { useContext, useState } from "react";
import { UsersService } from "@/hooks/users";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImLock } from "react-icons/im";
import Cookie from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import * as S from "./style";
import { ThemeContext } from "../layout";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { motion } from "framer-motion";
import moment from "moment";
import Link from "next/link";

type LoginUserFormData = z.infer<typeof createUserFormSchema>;

const createUserFormSchema = z.object({
  email: z.string().email("Email inválido").nonempty(),
  password: z.string().nonempty(),
});

const useLogin = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function onSubmit(data: LoginUserFormData) {
    const { email, password } = data;
    try {
      const res = await UsersService.login({
        email,
        password,
      });

      if (res.status) {
        const { status, userKey } = res;
        if (status === "CREATED") {
          router.push(`/confirm-email/${userKey}`);
          return;
        }
      }

      const { access_token, refresh_token, user } = res;

      console.log(res);
      if (!access_token || !refresh_token) {
        return new Error("Houve um erro na passagem dos dados!");
      }

      Cookie.set("access_token", access_token, {
        expires: 1,
        path: "/",
      });

      Cookie.set("refresh_token", refresh_token, {
        expires: 1,
        path: "/",
      });

      const { role } = user;

      if (role === "ADMIN") {
        router.push("/select");
        return;
      }

      router.push("/home");
    } catch (error) {
      console.log(error);
      setError("");
    }
  }

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    error,
  };
};

const titleAnimation = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export default function Login() {
  const { onSubmit, handleSubmit, register, errors, error } = useLogin();
  const { theme, handleTheme } = useContext(ThemeContext);

  const router = useRouter();
  const IconTheme = theme === "DARK" ? RiMoonLine : RiSunLine;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full h-[100vh]"
    >
      <S.Poster className="flex flex-col relative w-full h-[100vh] overflow-hidden bg-gradient-45 from-purple-800 to-cyan-500 top-0">
        <S.Bubble />
        <header className="z-[20] p-2 text-lg flex justify-between text-white">
          <S.ButtonTheme
            className="bg-zinc-900 text-white p-3 rounded"
            onClick={handleTheme}
          >
            <IconTheme />
          </S.ButtonTheme>
        </header>
        <motion.section className="flex flex-col p-4 px-[5rem] gap-8 justify-center flex-1">
          <div className="flex gap-2 flex-col w-full max-w-[40rem]">
            <motion.h1
              initial="initial"
              animate="animate"
              variants={titleAnimation}
              transition={{ delay: 0.4 }}
              className={`text-5xl text-white font-sm ${fontOpenSans}`}
            >
              Organize seu Tempo, Finanças e Mais com Facilidade!
            </motion.h1>
            <motion.h2
              initial="initial"
              animate="animate"
              variants={titleAnimation}
              transition={{ delay: 0.6 }}
              className="flex text-white font-sm max-w-[30rem]"
            >
              Sua solução completa para organização pessoal e controle
              financeiro fácil. Simplifique sua vida agora!
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`flex gap-2 ${fontOpenSans}`}
          >
            <Button
              onClick={() => router.push("/")}
              className="bg-white text-zinc-900 p-6 px-10 rounded text-md font-semibold"
            >
              Saiba mais!
            </Button>
            <Button
              onClick={() => router.push("/register")}
              className="bg-transparent border border-white text-white p-6 px-10 rounded text-md font-semibold"
            >
              Começe aqui.
            </Button>
          </motion.div>
        </motion.section>
      </S.Poster>
      <Form
        bgTheme
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit(onSubmit)}
        className={`shadow-2xl max-w-[32rem] bg-opacity-20 h-auto relative backdrop-blur-3xl p-14 px-16 justify-center`}
      >
        <div className="flex flex-col mb-10 gap-1">
          <h1
            className={`text-[2rem] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-full flex justify-center text-cyan-400 ${fontRoboto}`}
          >
            Faça o Login!
          </h1>
          <h2
            className={`text-[1rem] flex w-[80%] mx-auto text-center justify-center font-sm opacity-70`}
          >
            Bem vindo de volta! Faça o login digitando seu email e senha logo
            abaixo.
          </h2>
        </div>
        <Input
          required
          register={register("email")}
          className={`border focus:border-cyan-500 rounded `}
        >
          <div className="absolute z-10 right-4 pointer-events-none ">
            <MdMail className="opacity-40" size="20" />
          </div>
          <span>Email</span>
        </Input>
        {errors.email && <>{errors.email.message}</>}
        <Input
          register={register("password")}
          required
          type="password"
          className={`border focus:border-cyan-500 rounded `}
        >
          <div className="absolute z-10 right-4 pointer-events-none ">
            <ImLock className="opacity-40" size="20" />
          </div>
          <span>Password</span>
        </Input>
        <div className="flex w-full items-center gap-2">
          <button
            type="button"
            className="w-5 h-5 border rounded border-zinc-400"
          />
          <span>Mantenha-me contectado</span>
        </div>
        <motion.button 
        whileHover={{ scale: 1.04  }}
        transition={{ type: 'spring', duration: 0.2}}
        className="py-3 mt-5 bg-gradient-45 from-purple-600 to-cyan-400 w-full text-white font-normal text-lg rounded font-semibold">
          Entrar
        </motion.button>
        <p className="flex gap-1">
          Ainda não tem uma conta?{" "}
          <Link href="/register" className="text-cyan-600">
            Crie uma conta!
          </Link>
        </p>
        <span className="absolute bottom-4 text-sm opacity-50 flex">
          &copy; {moment().format("YYYY")} Calendar Ltda
        </span>
      </Form>
    </motion.div>
  );
}
