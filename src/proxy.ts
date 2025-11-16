import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils'


export async function proxy(request: NextRequest) {
  const cookieStore = await cookies()

  const pathname = request.nextUrl.pathname
  
  const accessToken = request.cookies.get("accessToken")?.value || null
  
  let userRole: UserRole | null = null
  if(accessToken){
    const verifiedToken : JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string)

    if(typeof verifiedToken === "string"){
      cookieStore.delete("accessToken")
      cookieStore.delete("refreshToken")
      return NextResponse.redirect(new URL('/login', request.url))
    }

    userRole = verifiedToken.role
  }

  const routeOwner = getRouteOwner(pathname)

  const isAuth = isAuthRoute(pathname)

  if(accessToken && isAuth){
    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
  }

  if(routeOwner === null){
    return NextResponse.next()
  }

  if(!accessToken){
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }
   
  if(routeOwner === "COMMON"){
    return NextResponse.next()
  }

  if (routeOwner === "ADMIN" || routeOwner === "DOCTOR" || routeOwner === "PATIENT"){
    if(userRole !== routeOwner){
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole),
      request.url))
    }
  }
  console.log(userRole);
  return NextResponse.next()
}


export const config = {
  // matcher: '/', //👈🏻
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)', 
      //use |.well-known if pathname not showing
  ],
}