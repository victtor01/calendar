"use client";
import Button from "@/components/button";
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

export default function Login() {
  const { onSubmit, handleSubmit, register, errors, error } = useLogin();
  const { theme, handleTheme } = useContext(ThemeContext);

  const IconTheme = theme === "DARK" ? RiMoonLine : RiSunLine;

  return (
    <motion.div className="flex w-full h-[100vh]">
    <S.Poster className="flex flex-col relative w-full h-[100vh] overflow-hidden bg-gradient-45 from-purple-800 to-cyan-500 top-0">
      <S.Bubble />
      <header className="z-[20] p-4 text-lg flex justify-between text-white">
        <button onClick={handleTheme}>
          <IconTheme />
        </button>
      </header>
      <section className="flex flex-col p-4 ">teste</section>
    </S.Poster>
    <Form
      bgTheme
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className={`shadow-xl max-w-[27rem] bg-opacity-20 h-auto relative backdrop-blur-3xl p-10 justify-center`}
    >
      <div className="flex flex-col mb-10 gap-1">
        <div
          className={`text-[2rem] w-full flex justify-center text-cyan-400 ${fontRoboto}`}
        >
          Faça o login
        </div>
        <div
          className={`text-[1rem] flex w-full text-center justify-center font-semibold opacity-70`}
        >
          Bem vindo de volta! Faça o login digitando seu email logo abaixo.
        </div>
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
      <Button className="bg-gradient-45 from-purple-600 to-cyan-400 w-full py-4 text-white font-normal text-lg rounded font-semibold">
        Entrar
      </Button>
    </Form>
  </motion.div>
  );
}
