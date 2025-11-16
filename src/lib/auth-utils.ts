// 📂src\lib\auth-utils.ts

export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT"

// declare type for route list
export type RouteConfig = {
  exact:string[], // for hard coded exact route 
  patterns:RegExp[] //for nested route
}

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"]

export const commonProtectedRoutes: RouteConfig ={
  exact: ["/my-profile", "/settings"],
  patterns:[]
}

// using regex for specific user's protected route
export const doctorProtectedRoutes : RouteConfig ={
  exact:[],
  patterns:[/^\/doctor/] //route starting with /doctor/* only protected for doctor
}

export const adminProtectedRoutes : RouteConfig ={
  exact:[],
  patterns:[/^\/admin/] //route starting with /admin/* only protected for admin
}
export const patientProtectedRoutes : RouteConfig ={
  exact:[],
  patterns:[/^\/dashboard/] //route starting with /dashboard/* only protected for patient
}

export const isAuthRoute =(pathname :string) =>{
  return authRoutes.some((route:string) => route === pathname)
} 
 
export const isRouteMatches = (pathname:string, routes:RouteConfig) : boolean =>{
  if(routes.exact.includes(pathname)){
    return true
  }
  return routes.patterns.some((pattern:RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname:string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null =>{
  if(isRouteMatches(pathname, adminProtectedRoutes)){
    return "ADMIN"
  }
  if(isRouteMatches(pathname, doctorProtectedRoutes)){
    return "DOCTOR"
  }
  if(isRouteMatches(pathname, patientProtectedRoutes)){
    return "PATIENT"
  }
  if(isRouteMatches(pathname, commonProtectedRoutes)){
    return "COMMON"
  }
  return null
}

export const getDefaultDashboardRoute = ( role : UserRole) : string =>{
  if(role === "ADMIN"){
    return "/admin/dashboard"
  }
  if(role === "DOCTOR"){
    return "/doctor/dashboard"
  }
  if(role === "PATIENT"){
    return "/dashboard"
  }
  return "/"
}

// create a new function to provide accurate url name 
export const isValidRedirectForRole = (redirectPath:string, role:UserRole) : boolean =>{
  const routeOwner = getRouteOwner(redirectPath)

  if(routeOwner === null || routeOwner === "COMMON"){
    return true
  }

  if(routeOwner === role){
    return true
  }

  return false
}