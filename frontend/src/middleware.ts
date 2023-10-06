import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./constants/publicRoute";
import { GetServerSidePropsContext } from "next";
import useApiPrivate from "./hooks/apiPrivate";

/* 
[x] proteger rota privada
[] proteger rota publica
*/

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Busque dados do servidor, por exemplo, com uma solicitação HTTP
  console.log("Teste");
  // Retorne os dados como props
  return {
    props: {
      teste: "teste",
    },
  };
}

export default async function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;
  const singInUrl = new URL("/login", request.url);
  const homeUrl = new URL("/home", request.url);

  const pathName = request.nextUrl.pathname;

  if (!ROUTES.public.includes(pathName) && !ROUTES.private.includes(pathName)) {
    return NextResponse.next();
  }

  // Caso esteja na rota publica
  if (ROUTES.public.includes(pathName)) {
    // Caso não tenha token de acesso
    if (!access_token) {
      return NextResponse.next();
    }
    return NextResponse.redirect(homeUrl);
  }

  // Caso esteja numa rota privada
  if (ROUTES.private.includes(pathName)) {
    // Caso não tenha acesso ao token
    if (!access_token) {
      return NextResponse.redirect(singInUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

/* export const config = {
    matcher: ['/login', '/home/:path*'],
}
 */
/* /_next/static/css/app/(client)/:path*' */
