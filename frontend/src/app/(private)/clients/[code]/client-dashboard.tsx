import { FaTachometerAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function ClientDashboard() {
  return (
    <div className="flex flex-col">
      <header className="flex gap-2 items-center text-xl font-semibold">
        <MdDashboard  />
        Dashboard
      </header>
      <section>
        <div className="flex w-full p-3 bg-black h-[20rem] rounded border dark:border-zinc-800">
          <div className="flex m-auto font-3xl font-semibold text-white">
            Em breve...
          </div>
        </div>
      </section>
    </div>
  );
}
