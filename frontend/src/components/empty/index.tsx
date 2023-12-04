export default function Empty() {
  return (
    <div className="w-full gap-3 flex-col h-full overflow-hidden flex justify-center items-center">
      <div className="w-auto h-auto bg-zinc-800 text-white p-5 text-2xl">
        ERROR 404
      </div>
      <div className="text-xl font-semibold max-w-[20rem] flex text-center">
        Página ou dado não encontrado, tente novamente mais tarde!
      </div>
    </div>
  );
}
