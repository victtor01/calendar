"use client";
import { Create } from "./create";
import { fontOpenSans, fontRoboto } from "@/app/fonts";
import { Form } from "./style";
import Header from "@/components/header";
import { RxSlash } from "react-icons/rx";
import Link from "next/link";
import { convertToBreadcrumb } from "@/helpers/convertToBreadcrumb";
import { usePathname } from "next/navigation";
import UserComponents from "@/components/userComponents";
import * as S from "./style";

const useFinance = () => {
  const pathNames = convertToBreadcrumb(usePathname());

  return {
    pathNames,
  };
};

export default function Finance() {
  const { pathNames } = useFinance();

  return (
    <Form
      className={`${fontOpenSans} m-auto flex flex-col max-w-[35rem] w-[100%] min-h-auto relative shadow p-1 rounded-md`}
    >
      <S.Header
        className={`z-10 flex items-center justify-between rounded-md overflow-hidden`}
      >
        {/* <div className="justify-start text-white">
          <div className="flex items-center bg-gradient-to-r from-cyan-600 to-cyan-600 rounded-md">
            {pathNames?.map((segment: string, index: number) => {
              const fullPath = `/${pathNames.slice(0, index + 1).join("/")}`;
              return (
                <div key={index} className="flex items-center">
                  {index > 0 && <RxSlash size="20" className="opacity-20" />}
                  <Link
                    href={fullPath}
                    className="opacity-90 hover:opacity-100 gap-2 p-3 px-4 "
                  >
                    {segment}
                  </Link>
                </div>
              );
            })}
          </div>
        </div> */}
        <div className={"justify-end flex gap-2 font-semibold opacity-100 px-2" + ` ${fontRoboto} `}>
          <div className=" text-xl opacity-50">
            <h1>Criar Registro</h1>
          </div>
        </div>
        <div className="justify-end flex gap-2 text-white p-2">
          <Link
            href={"/finance/registers"}
            className="p-3 rounded-md opacity-80 hover:opacity-100 bg-cyan-600 hover:shadow-lg transition-shadow"
          >
            Meus registros
          </Link>
          <Link
            href={"/finance/accounts"}
            className="p-3 rounded-md opacity-80 hover:opacity-100 bg-cyan-600 hover:shadow-lg transition-shadow"
          >
            Minhas contas
          </Link>
        </div>
      </S.Header>
      <Create />
    </Form>
  );
}
