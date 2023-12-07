export default function SkeletonRegister() {
  return (
    <div className="gap-2 shadow bg-zinc-500 bg-opacity-20 flex flex-col rounded-xl p-4 w-full mx-auto">
      <div className="animate-pulse flex gap-6 items-center">
        <div className="flex-col gap-2 flex-col flex flex-1">
          <div className="p-2 w-20 bg-zinc-500 bg-opacity-30 rounded-xl"></div>
          <div className="p-2 bg-zinc-500 bg-opacity-30 rounded"></div>
        </div>
        <div className="flex-col gap-2 flex-col flex flex-1">
          <div className="p-2 w-20 bg-zinc-500 bg-opacity-30 rounded-xl"></div>
          <div className="p-2 bg-zinc-500 bg-opacity-30 rounded"></div>
        </div>
        <div className="flex-col gap-2 flex-col flex flex-1">
          <div className="p-2 w-20 bg-zinc-500 bg-opacity-30 rounded-xl"></div>
          <div className="p-2 bg-zinc-500 bg-opacity-30 rounded"></div>
        </div>
        <div className="flex-col gap-2 flex-col flex flex-1">
          <div className="p-2 w-20 bg-zinc-500 bg-opacity-30 rounded-xl"></div>
          <div className="p-2 bg-zinc-500 bg-opacity-30 rounded"></div>
        </div>
        <div className="flex-col gap-2 flex-col flex">
          <div className="p-2 w-8 h-8 bg-zinc-500 bg-opacity-30 rounded"></div>
        </div>
        <div className="flex-col gap-2 flex-col flex">
          <div className="p-2 w-8 h-8 bg-zinc-500 bg-opacity-30 rounded"></div>
        </div>
      </div>
    </div>
  );
}
