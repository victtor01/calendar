"use client";
import { Button } from "@nextui-org/react";
import Form from "@/components/form";
import Input from "@/components/input/input";
import { fontRoboto, fontOpenSans } from "@/app/fonts";
import { MdMail, MdOutlineError } from "react-icons/md";
import { useContext, useState } from "react";
import { UsersService } from "@/hooks/users";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImLock } from "react-icons/im";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import * as S from "./style";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { motion } from "framer-motion";
import moment from "moment";
import Link from "next/link";
import Spinner from "@/components/spinner";
import Poster from "./poster";
import { Theme, ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "@/contexts/publicThemeContext";

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
    formState: { errors, isSubmitting },
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

      if (!access_token || !refresh_token) {
        toast.error("Houve um erro, tente novamente mais tarde!");
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
      toast.error("Email ou senha incorretos");
    }
  }

  return {
    onSubmit,
    handleSubmit,
    isSubmitting,
    register,
    errors,
    error,
  };
};

export default function Login() {
  const { onSubmit, handleSubmit, register, errors, isSubmitting, error } =
    useLogin();
  const { theme } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full h-[100vh]"
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme={theme.toLowerCase() as Theme}
      />

      <Poster />

      <Form
        bgTheme={false}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit(onSubmit)}
        className={`shadow-2xl w-[50%] h-auto relative backdrop-blur-3xl p-14 px-16 justify-center bg-gray-50 dark:bg-zinc-900`}
      >
        <div className="flex w-full flex-col gap-3 max-w-[30rem]">
          {error && <div>{error}</div>}
          <div className="flex flex-col mb-10 gap-1">
            <h1
              className={`text-[2rem] text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 w-full flex justify-center text-cyan-400 ${fontRoboto}`}
            >
              Faça o Login!
            </h1>
            <h2
              className={`text-[1rem] flex w-[80%] mx-auto text-center justify-center font-semibold opacity-70`}
            >
              Bem vindo de volta! Faça o login digitando seu email e senha logo
              abaixo.
            </h2>
          </div>
          <Input
            required
            type="text"
            autoComplete="off"
            register={register("email")}
            className={`border focus:border-cyan-500 rounded bg-white dark:bg-zinc-800 `}
          >
            <div className="absolute z-10 right-4 pointer-events-none ">
              <MdMail className="opacity-40" size="20" />
            </div>
            <span>Email</span>
          </Input>
          {errors.email && (
            <div className="w-full text-red-500 flex gap-2 items-center">
              <MdOutlineError />
              {errors.email.message}
            </div>
          )}
          <Input
            register={register("password")}
            required
            type="password"
            autoComplete="off"
            className={`border border-zinc-200 focus:border-cyan-500 rounded bg-white dark:bg-zinc-800 `}
          >
            <div className="absolute z-10 right-4 pointer-events-none ">
              <ImLock className="opacity-40" size="20" />
            </div>
            <span>Password</span>
          </Input>
          {errors.password && (
            <div className="w-full text-red-500 flex gap-2 items-center">
              <MdOutlineError />
              {errors.password.message}
            </div>
          )}
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex gap-2">
              <input type="checkbox" />
              <span>Mantenha-me contectado</span>
            </div>
            <Link
              href={"/redefine-password/"}
              className="font-semibold text-indigo-700 dark:text-indigo-500"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", duration: 0.2 }}
            className="py-3 mt-5 bg-gradient-45 from-purple-600 to-blue-500 w-full text-white text-lg rounded font-semibold"
          >
            {isSubmitting ? (
              <Spinner className="w-[1.3rem] h-[1.3rem]" />
            ) : (
              "Entrar"
            )}
          </motion.button>
          <p className="flex gap-1">
            Ainda não tem uma conta?{" "}
            <Link href="/register" className="text-indigo-600 font-semibold">
              Crie uma conta!
            </Link>
          </p>
          <span className="absolute bottom-4 text-sm opacity-50 flex">
            &copy; {moment().format("YYYY")} Calendar Ltda
          </span>
        </div>
      </Form>
    </motion.div>
  );
}
