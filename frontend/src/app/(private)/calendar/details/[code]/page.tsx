"use client";
import Button from "@/components/button";
import Label from "@/components/label";
import moment from "moment-timezone";
import { Controller } from "react-hook-form";
import Input from "@/components/input/input";
import {
  BsFillPeopleFill,
  BsFillPersonLinesFill,
  BsFillSendFill,
  BsListNested,
  BsPenFill,
} from "react-icons/bs";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Clients } from "@/hooks/useClients";
import useDetails, {
  KeyOfEventsFormData,
  LabelFormEventsDataProps,
  OmitAllday,
} from "./useDatails";
import { fontRoboto } from "@/app/fonts";

const variants = {
  pageInitial: { opacity: 0, x: 40, y: 0 },
  pageAnimate: { opacity: 1, x: 0, y: 0 },
};

const ContentEditingClient = () => (
  <>
    <BsPenFill size="12" />
    Editar
  </>
);

const ContentNotEditingClient = () => (
  <>
    <AiOutlineClose size="12" />
    Cancelar
  </>
);

export default function Details({
  params: { code },
}: {
  params: {
    code: string;
  };
}) {
  const {
    form: {
      labelFormEventsData,
      handleSubmit,
      updateEvents,
      control,
      errors,
      reset,
    },
    comments: {
      onChangeContentEventsComments,
      contentEventsComments,
      createEventsComments,
    },
    query: { event, isLoading },
    edit: { handleEditingClient, editingClient },
    clients: {
      clients,
      isLoadingClients,
      handleAddNewClient,
      clientesSelecteds,
    },
  } = useDetails(code);

  if (isLoading || isLoadingClients) {
    return;
  }

  return (
    <motion.main
      variants={variants}
      initial="pageInitial"
      animate="pageAnimate"
      transition={{ type: "lienar" }}
    >
      <div className="w-full h-full flex gap-7 mt-5 relative justify-center">
        <div className="flex flex-row flex-wrap gap-2 w-full p-10">
          <form
            className="flex flex-col max-w-[25rem] w-full gap-2 mx-auto items-center"
            onSubmit={handleSubmit(updateEvents)}
          >
            <div
              className={`rounded justify-between opacity-70 w-full h-10 flex items-center gap-3 ${fontRoboto}`}
            >
              <h1 className="text-xl flex gap-3 items-center">
                <BsFillPersonLinesFill size="18" />
                Informações
              </h1>
              <Button
                type="button"
                onClick={handleEditingClient}
                className={`items-center gap-2 rounded text-white from-cyan-500 to-blue-500 tex-tg flex p-2 px-3 ${
                  editingClient ? "bg-red-600" : "bg-gradient-to-r"
                }`}
              >
                {!editingClient ? (
                  <ContentEditingClient />
                ) : (
                  <ContentNotEditingClient />
                )}
              </Button>
            </div>
            {labelFormEventsData.map(
              (label: LabelFormEventsDataProps, index: number) => {
                return (
                  <Controller
                    control={control}
                    key={index}
                    name={label.name as KeyOfEventsFormData}
                    defaultValue={label.default || event[label.name]}
                    render={({ field }: { field: OmitAllday }) => {
                      return (
                        <Label.Root className="m-0">
                          <Label.Title className="text-lg">
                            {label.span}
                          </Label.Title>
                          <input
                            {...field}
                            disabled={!editingClient}
                            type={label?.type || "text"}
                            className="min-h-[3rem] bg-transparent focus:border-cyan-500 p-3 outline-none rounded border border-zinc-500 border-opacity-40"
                          />
                          {errors &&
                            errors[label.name as KeyOfEventsFormData]?.message}
                        </Label.Root>
                      );
                    }}
                  />
                );
              }
            )}
            <Controller
              control={control}
              name={"allDay"}
              defaultValue={event.allDay}
              render={({ field }) => {
                return (
                  <Label.Root className="flex-col m-0 w-full gap-2">
                    <Label.Title className="flex text-lg">
                      O evento acontecerá todo o dia?
                    </Label.Title>
                    <Label.Content>
                      <Button
                        type="button"
                        disabled={!editingClient}
                        className={`p-3 flex w-full justify-center items-center text-white rounded ${
                          !!field.value ? "bg-emerald-400" : "bg-rose-500"
                        }`}
                        onClick={() =>
                          field.onChange(field.value ? false : true)
                        }
                      >
                        {field.value ? "Ligado" : "Desligado"}
                      </Button>
                    </Label.Content>
                    {errors?.allDay?.message}
                  </Label.Root>
                );
              }}
            />
            <Label.Root className="m-0">
              <Label.Title className="text-lg">Cor</Label.Title>
              <Label.Content className="flex-row ">
                <Controller
                  control={control}
                  name={"color"}
                  defaultValue={event.color || "#01f9f1"}
                  render={({ field }: { field: OmitAllday }) => {
                    return (
                      <>
                        <input
                          {...field}
                          disabled={!editingClient}
                          type="color"
                          className="bg-zinc-200 h-[3rem] rounded flex p-1"
                        />
                        <div
                          style={{
                            background: field.value || event.color || "#01f9f1",
                          }}
                          className="opacity-80 text-shadow shadow-lg flex flex-1 items-center px-3 rounded h-full text-white"
                        >
                          Conteúdo de exemplo
                        </div>
                      </>
                    );
                  }}
                />
              </Label.Content>
            </Label.Root>
            <div className="flex w-full gap-2 justify-between">
              {editingClient && (
                <div className="flex flex-1 gap-2">
                  <Button
                    onClick={() => reset()}
                    type="button"
                    className="bg-gradient-to-r rounded text-white from-cyan-500 to-blue-500 flex p-3 "
                  >
                    Limpar
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded text-white flex justify-center p-3">
                    Salvar
                  </Button>
                </div>
              )}
            </div>
          </form>
          <form className="flex flex-col max-w-[30rem] w-full gap-2 justify-center  mx-auto items-center">
            <div
              className={`rounded opacity-70 w-full h-10 flex items-center gap-3 ${fontRoboto}`}
            >
              <BsListNested size="18" />
              <h1 className="text-xl">Meus comentários</h1>
            </div>
            <div className="flex flex-1 w-full flex-col rounded">
              <div className="w-full flex items-center gap-1">
                <Input
                  onChange={onChangeContentEventsComments}
                  value={contentEventsComments}
                  placeholder="Exemple"
                  className="w-full p-3 rounded border border-zinc-500 border-opacity-20 bg-white bg-opacity-50 outline-none"
                />
                <Button
                  onClick={createEventsComments}
                  type="button"
                  className="w-14 flex items-center justify-center h-12 bg-cyan-500 rounded text-white "
                >
                  <BsFillSendFill />
                </Button>
              </div>
              <div className="flex flex-col mt-2 gap-1 w-full flex-1 max-h-[30rem] overflow-auto">
                {event?.comments?.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 bg-gray-400 bg-opacity-10 border border-zinc-300 border-opacity-10 opacity-80 hover:opacity-100 justify-center p-3 pl-4 relative min-h-auto"
                  >
                    <div className="flex min-h-auto">
                      {moment
                        .tz(item.createdAt, "America/Sao_Paulo")
                        .format("MM/DD - HH[h]mm")}
                    </div>

                    <div className="flex w-full">
                      <span className="bg-cyan-600 h-full w-1 absolute top-0 left-0" />
                      <div className="flex-1 flex text-justify">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
          <form className="flex flex-col max-w-[25rem] gap-0 min-w-[20rem] w-full gap-2 justify-center  mx-auto items-center ">
            <div
              className={`rounded opacity-70 w-full h-10 flex items-center gap-3 ${fontRoboto}`}
            >
              <BsFillPeopleFill size="18" />
              <h1 className="text-xl">Clientes</h1>
            </div>
            <div className="flex flex-1 w-full gap-5 flex-col rounded">
              <div className="p-0 w-full flex items-center gap-1">
                <Input
                  placeholder="Cliente de exemplo"
                  className="w-full p-3 rounded border border-zinc-500 border-opacity-20 bg-white bg-opacity-50 outline-none"
                />
                <Button
                  type="button"
                  className="w-14 flex items-center justify-center h-12 bg-cyan-500 rounded text-white "
                >
                  <AiOutlineSearch size="20" />
                </Button>
              </div>
              <div className="flex gap-1 flex-col w-full flex-1 max-h-[30rem] overflow-auto">
                {clients?.map((client: Clients) => {
                  const selected: boolean = clientesSelecteds?.includes(
                    client.id
                  );
                  const classSelected = selected
                    ? "bg-rose-500"
                    : "bg-cyan-500";
                  return (
                    <div
                      key={client.id}
                      className="flex gap-1 items-center opacity-90 hover:opacity-100"
                    >
                      <div className="w-full flex justify-between p-2 bg-gray-400 bg-opacity-10 items-center border-b border-zinc-500 border-opacity-30">
                        <div>{client.firstName}</div>
                        <Button
                          type="button"
                          className={`rounded text-white transition-background ${classSelected}`}
                          onClick={() => handleAddNewClient(client.id)}
                        >
                          {selected ? "Remover" : "Selecionar"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.main>
  );
}
