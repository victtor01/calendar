import { TemplateDialog } from "./template";
import { Links } from "./links";
import Add from "./add";

export default function Header() {
  return (
    <header className="relative bg-zinc-800 rounded-t-md text-white  mx-auto p-2 gap-2 flex w-full transition-shadow items-center justify-center">
      <Add />

      <Links />

      <TemplateDialog />
    </header>
  );
}
