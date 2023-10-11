"use client";
import Header from "@/components/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { convertToBreadcrumb } from "@/helpers/convertToBreadcrumb";
import { BiSolidChevronRight } from "react-icons/bi";
import { fontOpenSans, fontRoboto } from "@/app/fonts";

interface layoutProps {
  children: React.ReactNode;
}

const useLayout = () => {
  const pathNames = convertToBreadcrumb(usePathname());

  return {
    pathNames,
  };
};

export default function Layout({ children }: layoutProps) {
  const { pathNames } = useLayout();

  return (
    <>
      <Header.Root className={`p-2 bg-red-200 shadow-sm pl-[1rem]`}>
        <Header.Division className="justify-start">
          <div className="flex items-center gap-2 bg-cyan-100 p-3 px-4 rounded shadow-md">
            {pathNames?.map((segment, index) => {
              const fullPath = `/${pathNames.slice(0, index + 1).join("/")}`;
              return (
                <>
                  {index > 0 && <BiSolidChevronRight size="15" />}
                  <Link
                    key={segment}
                    href={fullPath}
                    className="opacity-70 hover:opacity-100"
                  >
                    {segment}
                  </Link>
                </>
              );
            })}
          </div>
        </Header.Division>
        <Header.Division className="justify-end">
          <Link
            href={"/Registros"}
            className="p-3 rounded opacity-70 hover:opacity-100"
          >
            Registros
          </Link>
          <Link
            href={"/finance/accounts"}
            className="p-3 rounded opacity-70 hover:opacity-100"
          >
            Contas
          </Link>
        </Header.Division>
      </Header.Root>
      {children}
    </>
  );
}
