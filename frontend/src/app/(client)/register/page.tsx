"use client";
import Form from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fontOpenSans, fontRoboto, fontValela } from "@/app/fonts";
import { IoAlertCircleSharp } from "react-icons/io5";
import { MdInsertPhoto } from "react-icons/md";
import { ListProps, FormDataProps } from "./interfaces";
import { formData } from "./formData";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Label from "@/components/label";
import { useForm } from "react-hook-form";
import * as S from "./style";
import { z } from "zod";
import { UsersService } from "@/hooks/users";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "../layout";
import Link from "next/link";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const createUserFormSchema = z
  .object({
    firstName: z.string().nonempty("Digite o primeiro nome"),
    lastName: z.string().nonempty("Digite o sobrenome"),
    email: z.string().email("Email inválido!"),
    photo: z
      .custom<FileList>()
      .transform((list) => list[0])
      .refine(
        (file) => file?.size <= 5 * 1024 * 1024 && file.name,
        "Selecione uma foto para o seu perfil"
      ),
    /* cep: z
      .string()
      .nonempty("Campo obrigatório")
      .min(8, "Preencha corretamente")
      .max(8, "Preencha o campo corretamente"), */
    password: z.string().min(5, "A senha deve conter no mínimo 6 digitos"),
    repeatPassword: z.string(),
    phone: z
      .string().nonempty('O campo é obrigatório')
      .min(11, 'Digite o número corretamente!')
      .max(11, 'Digite o número corretamente')
      .refine(
        (phone) => {
          return /^\d+$/.test(phone);
        },
        {
          message: "Digite apenas números",
        }
      ),
    birth: z.string().refine((date) => date.length < 11, "Data inválida"),
    cpf: z
      .string()
      .nonempty('O campo não pode estar vazío')
      .min(11, "Formato errado! Digite o formato certo")
      .max(11, "Formato errado! Digite o formato certo"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "As senhas não coecidem",
    path: ["repeatPassword"],
  });

const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function createUser(body: CreateUserFormData): Promise<void> {
    const response = await UsersService.create(body);
    const { data } = response;

    if (response.status === 201 && response.data.key) {
      const { key } = data;
      window.location.href = `/confirm-email/${key}`;
    }
  }

  return {
    register,
    handleSubmit,
    createUser,
    errors,
  };
};

export default function RegisterPage() {
  const { register, handleSubmit, createUser, errors } = useRegister();
  const { theme, handleTheme } = useContext(ThemeContext);
  const pathName = usePathname();
  const IconTheme = theme === "DARK" ? RiMoonLine : RiSunLine;

  return (
    <motion.div
      key={pathName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <header className="flex absolute top-0 p-3 justify-between w-full z-[20]">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-5"
        >
          <Link
            href="/login"
            className={`${fontValela} text-lg bg-transparent border border-white hover:bg-white hover:text-black backdrop-blur-md text-white p-2 rounded px-4`}
          >
            já tem uma conta?
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-cneter gap-3"
        >
          <Button
            onClick={handleTheme}
            className="bg-zinc-900 backdrop-blur-xl bg-opacity-20 text-white rounded p-3"
          >
            <IconTheme />
          </Button>
        </motion.div>
      </header>
      <div
        className={`w-full h-[40rem] overflow-hidden relative bg-cyan-100 overflow-hidden mx-auto bg-gradient-45 from-purple-600 to-cyan-400 ${fontRoboto}`}
      >
        <S.Bubble />
        <div className="inset-0 flex h-[40rem] items-center justify-center z-10 flex-col bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.1)]">
          <div className="flex flex-col text-white">
            <div className="text-7xl flex w-auto font-bold">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Calendar
              </motion.h1>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`flex text-3xl `}
            >
              Sua organização é nossa prioridade!
            </motion.h2>
          </div>
        </div>
      </div>
      <S.Form
        className="max-w-[35rem] mx-auto flex flex-col min-h-[40rem] mb-20  p-10 rounded-xl z-10 mt-[-15rem] shadow-xl"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1 mb-10">
          <div
            className={`text-[2rem] w-full text-cyan-500  opacity-100 ${fontRoboto}`}
          >
            Registrar-se
          </div>
          <div className="text-[1.2rem] font-semibold opacity-70">
            Olá, prazer em te conhecer! Preencha os dados abaixo para fazer seu
            cadastro!
          </div>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="w-full bg-red-800 rounded py-4 flex items-center justify-center opacity-70">
            <h2 className="text-normal text-white">
              Preencha todos os campos corretamente!
            </h2>
          </div>
        )}
        {formData.map(
          ({ name, items, icon: Icon }: ListProps, index: number) => (
            <Label.Root key={index} className="mt-5">
              <Label.Title>
                <Icon size="20" />
                {name}
              </Label.Title>
              {items?.map(({ name, span, type, ex }: FormDataProps) => {
                const classError = errors[name as keyof CreateUserFormData]
                  ? "shadow-[0_0_0_1px] shadow-red-500 opacity-80 focus:shadow-none"
                  : "";
                return (
                  <Label.Content key={`${name}-${span}`}>
                    <span className="text-[1rem] font-semibold opacity-60 ">
                      {span}
                    </span>
                    <input
                      type={type}
                      className={`${classError} border border-transparent p-3 focus:border-cyan-600 outline-none placeholder:opacity-40 rounded appearance-none px-3 bg-zinc-500 bg-opacity-10`}
                      {...register(name as keyof CreateUserFormData)}
                      autoComplete="off"
                      placeholder={`exp: ${ex}`}
                    />
                    {errors[name as keyof CreateUserFormData] && (
                      <span className="opacity-90 text-red-400 text-normal flex gap-1 items-center">
                        <IoAlertCircleSharp />
                        {errors[name as keyof CreateUserFormData]?.message}
                      </span>
                    )}
                  </Label.Content>
                );
              })}
            </Label.Root>
          )
        )}
        <h2 className="mt-3 w-full text-lg flex gap-1 items-center">
          <MdInsertPhoto size="20" /> Selecione uma foto para o seu perfil
        </h2>
        <div className="p-3 w-[15rem] h-[15rem] self-start flex bg-gradient-to-b opacity-30 rounded from-zinc-800 to-zinc-900 rounded">
          <span className="text-2xl mx-auto flex center m-auto text-white h-auto items-center justify-center w-full text-center">
            Nenhuma foto selecionada
          </span>
        </div>
        <input type="file" {...register("photo")} className="self-start" />
        {errors && errors.photo && (
          <span className=" w-full opacity-90 text-red-400 text-normal flex gap-1 items-center">
            <IoAlertCircleSharp />
            {errors.photo?.message}
          </span>
        )}
        <Button
          type="submit"
          className={`bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold w-full py-4 rounded text-lg mt-3 `}
        >
          Enviar
        </Button>
      </S.Form>
    </motion.div>
  );
}
