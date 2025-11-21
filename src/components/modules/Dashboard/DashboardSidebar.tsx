import { getUserInfo } from "@/services/auth/getUserInfo"
import { UserInfo } from "@/types/user.interface"
import DashboardSidebarContent from "./DashboardSidebarContent"

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo
  return <DashboardSidebarContent userInfo={userInfo} />
}

export default DashboardSidebar

/*-------------- 1
Same as Navbar I will create a client component file for sidebar content.

1. I will make this a async-await component and copy-paste the UserInfo as Dashboard navbar
2. Call the DashboardSidebarContent and pass the userInfo as props
3. After Passing the props I will start coding on DashboardSidebarContent

*/