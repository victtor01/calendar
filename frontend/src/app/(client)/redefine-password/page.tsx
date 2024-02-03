export default function RefinePassword() {
  return (
    <main className="w-full h-screen flex">
      <div className="flex flex-col gap-6 m-auto justify-center items-center">
        <header className="flex flex-col gap-1 text-center">
          <h1 className="text-xl font-semibold">
            Digite seu email para recuperar sua senha!
          </h1>
          <h1 className="text-lg">Enviaremos um link para o seu email.</h1>
        </header>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="input form" className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Email"
              className="w-full p-3 bg-zinc-100 dark:bg-zinc-800 outline-none rounded"
            />
          </label>
          <button className="text-white bg-indigo-600 p-3 w-full rounded opacity-80 hover:opacity-100">
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}
