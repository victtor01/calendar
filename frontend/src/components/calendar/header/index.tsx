import { TemplateDialog } from "./template";
import { Links } from "./links";
import Add from "./add";

export default function Header() {
  return (
    <header className="relative bg-white dark:bg-zinc-950 border shadow-md dark:shadow-black border-transparent dark:border-zinc-700 rounded-lg text-gray-700 dark:text-white  mx-auto p-2 gap-2 flex w-full transition-shadow items-center justify-center">
      <Add />

      <Links />

      <TemplateDialog />
    </header>
  );
}
