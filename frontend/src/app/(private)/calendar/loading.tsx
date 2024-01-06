export default function Loading() {
  return (
    <div className="flex w-full h-full flex-col">
      <section className="flex w-full flex-col p-4 flex-1 min-h-[20rem] bg-blue-100 dark:bg-zinc-900 rounded-2xl">
        <header className="flex w-full h-10 items-center justify-between">
          <div className="flex w-28 bg-blue-50 dark:bg-zinc-800 h-10 rounded-lg animate-pulse"></div>
          <div className="flex w-20 bg-blue-50 dark:bg-zinc-800 h-10 rounded-lg animate-pulse"></div>
          <div className="flex w-20 bg-blue-50 dark:bg-zinc-800 h-10 rounded-lg animate-pulse"></div>
        </header>
        <section className="flex mt-6 rounded bg-blue-50 dark:bg-zinc-800 animate-pulse w-full h-[100vh]"></section>
      </section>
    </div>
  );
}
