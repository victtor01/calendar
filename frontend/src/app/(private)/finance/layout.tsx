"use client";
import Header from "@/components/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { convertToBreadcrumb } from "@/helpers/convertToBreadcrumb";
import { RxSlash } from "react-icons/rx";

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
      <header className={`text-white p-3 flex items-center justify-between`}>
        <div className="justify-start">
          <div className="flex items-center bg-gradient-to-r from-cyan-500 to-cyan-600 rounded">
            {pathNames?.map((segment, index) => {
              const fullPath = `/${pathNames.slice(0, index + 1).join("/")}`;
              return (
                <div key={index} className="flex items-center ">
                  {index > 0 && <RxSlash size='20' className='opacity-20'/>}
                  <Link
                    href={fullPath}
                    className="opacity-70 hover:opacity-100 gap-2 p-3 px-4 "
                  >
                    {segment}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="justify-end flex gap-2">
          <Link
            href={"/finance/registers"}
            className="p-3 rounded opacity-70 hover:opacity-100 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:shadow-lg transition-shadow"
          >
            Registros
          </Link>
          <Link
            href={"/finance/accounts"}
            className="p-3 rounded opacity-70 hover:opacity-100 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:shadow-lg transition-shadow"
          >
            Contas
          </Link>
        </div>
      </header>
      {children}
    </>
  );
}
