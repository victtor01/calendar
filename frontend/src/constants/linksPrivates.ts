import { IconType } from "react-icons";
import { CiCircleList } from "react-icons/ci";
import { FaCalendar } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { GoGear, GoHomeFill, GoPersonFill } from "react-icons/go";
import { RiSuitcaseFill } from "react-icons/ri";

interface Page {
  name: string;
  href: string;
  icon?: IconType;
}

export const pages: Page[] = [
  { name: "Dashboard", icon: GoHomeFill, href: "/home" },
  { name: "Calendário", icon: FaCalendar, href: "/calendar" },
  { name: "Financeiro", icon: FaCircleDollarToSlot, href: "/finance" },
  { name: "Clientes", icon: GoPersonFill, href: "/clients" },
  { name: "Serviços", icon: RiSuitcaseFill, href: "/services" },
];

/* { name: "To-do", icon: CiCircleList, href: "/todo" }, */
/* { name: "Configurar", icon: GoGear, href: "/configurations" }, */

export const otherPages: Page[] = [
  { name: "Entrar em contato", href: "/contact" },
  { name: "Reportar bug", href: "/" },
  { name: "Ajuda", href: "/" },
  { name: "Termos de serviço", href: "/" },
];
