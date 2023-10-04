import { NextRequest, NextResponse } from "next/server"
import { PUBLIC_ROUTE } from "./constants/publicRoute";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;

    const singInUrl = new URL('/login', request.url);
    const homeUrl = new URL('/home', request.url)

   /*  console.log(request.nextUrl.pathname);
    if (!token && PUBLIC_ROUTE.includes(request.nextUrl.pathname)) {
        return NextResponse.next()
    }

    if (!token && !PUBLIC_ROUTE.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(singInUrl);
    } */
    /* if (!token) {
        if (request.nextUrl.pathname === '/login') {
            return NextResponse.next()
        }
        return NextResponse.redirect(singInUrl)
    }
 */
    /* if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(homeUrl)
    }
    return NextResponse.next() */
    return NextResponse.next()
}


/* export const config = {
    matcher: ['/login', '/home/:path*'],
}
 */
/* /_next/static/css/app/(client)/:path*' */