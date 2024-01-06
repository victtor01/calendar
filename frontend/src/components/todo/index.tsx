"use client";

const dataTmp: any = [];
for (let i = 0; i < 10; i++) {
  dataTmp.push({
    id: i,
    name: `task-[${i}]`,
  });
}

export default function Todo() {
  return (
    <div className="flex flex-col gap-2">
      {dataTmp?.map((item: any, index: number) => (
        <div
          key={index}
          className="flex gap-3 items-center text-normal capitalize font-semibold"
        >
          <span className="flex w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded" />
          {item.name}
        </div>
      ))}
    </div>
  );
}
