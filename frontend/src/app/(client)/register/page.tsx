"use client";
import Form from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fontOpenSans, fontRoboto } from "@/app/fonts";
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
    password: z.string().min(5, "A senha deve conter no mínimo 6 digitos"),
    repeatPassword: z.string(),
    phone: z.string().refine(
      (phone) => {
        return /^\d+$/.test(phone); // Verifica se o valor é uma string contendo apenas dígitos
      },
      {
        message: "Digite apenas números",
      }
    ),
    birth: z.string().refine((date) => date.length < 11, "Data inválida"),
    cpf: z.string().nonempty(),
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
    try {
      const response = await UsersService.create(body);
      const { data } = response;

      if (response.status === 201 && response.data.key) {
        const { key } = data;
        window.location.href = `/confirm-email/${key}`;
      }
    } catch (error) {
      console.log(error);
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
  const pathName = usePathname();

  return (
    <motion.div
      key={pathName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={`w-full h-[40rem] bg-cyan-100 relative overflow-hidden mx-auto  ${fontRoboto}`}
      >
        <div className="absolute  shadow-[inset_0_-2rem_10rem] shadow-gray-400  inset-0 flex items-center justify-center z-10 backdrop-blur-sm backdrop-brightness-[90%] flex-col bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-900">
          <div className="flex flex-col">
            <h1 className=" rounded text-7xl font-bold flex">Calendar</h1>
            <h2 className={`flex text-3xl `}>
              Sua organização é nossa prioridade!
            </h2>
          </div>
        </div>
        <S.ImageBackground />
      </div>
      <Form
        className="max-w-[30rem] min-h-[40rem]"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1 mb-10">
          <div className={`text-[2rem] w-full text-cyan-500  ${fontRoboto}`}>
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
          ({ name, icon: Icon, items }: ListProps, index: number) => (
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
                    <Input
                      type={type}
                      className={`${classError} border focus:border-cyan-600 placeholder:opacity-40 rounded appearance-none px-3e`}
                      register={register(name as keyof CreateUserFormData)}
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
          className={`bg-gradient-to-r from-cyan-300 to-cyan-400 text-gray-700 font-semibold w-full py-4 rounded text-lg mt-3 `}
        >
          Enviar
        </Button>
      </Form>
    </motion.div>
  );
}
