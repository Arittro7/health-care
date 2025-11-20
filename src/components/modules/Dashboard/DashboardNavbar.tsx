import { getUserInfo } from "@/services/auth/getUserInfo"
import DashboardNavbarContent from "./DashboardNavbarContent"

const DashboardNavbar = async () => {

  const userInfo = await getUserInfo()
  return <DashboardNavbarContent userInfo={userInfo}/>
}

export default DashboardNavbar

/* --------------3
Now I have to pass the userInfo to the dashboard navbar content as prop, for that I have to make this function async-await.
[note: Until receive the props on DashboardNavbarContent components It will show error]
*/