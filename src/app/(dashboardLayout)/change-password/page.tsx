
const ChangePasswordPage = () => {
  return (
    <div>ChangePasswordPage</div>
  )
}

export default ChangePasswordPage

/*
Add this route on common protected route list on 📂src\lib\auth-utils.ts 
export const commonProtectedRoutes: RouteConfig ={
  exact: ["/my-profile", "/settings", "/change-password"],
  patterns:[]
}

other wise It will become a public route
*/