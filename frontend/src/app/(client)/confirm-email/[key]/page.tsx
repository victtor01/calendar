import { UsersService } from "@/hooks/users";
import { SubmitCode } from "./input";
import { ConfirmationCodesService } from "@/hooks/confirmation-codes-service";

interface confirmEmailProps {
  params: {
    key: string;
  };
}

export default async function ConfirmEmail({ params }: confirmEmailProps) {
  const user = await UsersService.findOneByKey(params.key);

  if (!user?.id || !(user.status === 'CREATED')) {
    return (
      <div className="m-auto w-full max-w-[30rem] justify-center min-h-[50rem] h-full p-10 flex flex-col gap-1">
        <header className="p-10 w-full flex flex-col gap-2">
          <h1 className="text-4xl text-red-500">ERRO 404</h1>
          <p className="text-2xl">Essa página não está disponível.</p>
        </header>
      </div>
    );
  }

  await ConfirmationCodesService.create(user?.id);

  return (
    <div
      className={`min-h-[50rem] justify-center m-auto gap-5 w-full max-w-[30rem] h-full p-10 flex flex-col `}
    >
      <header className="w-full flex flex-col gap-2 ">
        <h1 className="text-3xl">Olá, {user.firstName}!</h1>
        <h2 className="text-xl">Enviaremos um email para o email {user.email}</h2>
      </header>
      <SubmitCode userId={user.id} />
    </div>
  );
}
