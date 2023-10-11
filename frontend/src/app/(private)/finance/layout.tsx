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
      <Header.Root className={`p-2 bg-red-200 shadow-sm pl-[1rem]`}>
        <Header.Division className="justify-start">
          <div className="flex items-center gap-1 bg-cyan-100 rounded">
            {pathNames?.map((segment, index) => {
              const fullPath = `/${pathNames.slice(0, index + 1).join("/")}`;
              return (
                <div key={index} className="flex items-center gap-1 ">
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
        </Header.Division>
        <Header.Division className="justify-end">
          <Link
            href={"/finance/registers"}
            className="p-3 rounded opacity-70 hover:opacity-100 bg-sky-200 hover:shadow-lg transition-sahdow"
          >
            Registros
          </Link>
          <Link
            href={"/finance/accounts"}
            className="p-3 rounded opacity-70 hover:opacity-100 bg-sky-200 hover:shadow-lg transition-sahdow"
          >
            Contas
          </Link>
        </Header.Division>
      </Header.Root>
      {children}
    </>
  );
}
