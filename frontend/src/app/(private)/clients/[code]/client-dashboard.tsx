import { FaTachometerAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function ClientDashboard() {
  return (
    <div className="flex flex-col">
      <header className="flex gap-2 items-center text-xl font-semibold">
        <MdDashboard  />
        Dashboard
      </header>
    </div>
  );
}
