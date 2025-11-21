import { getUserInfo } from "@/services/auth/getUserInfo"
import { UserInfo } from "@/types/user.interface"
import DashboardSidebarContent from "./DashboardSidebarContent"
import { getDefaultDashboardRoute } from "@/lib/auth-utils"
import { navSection } from "@/types/dashboard.interface"

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo

  const navItems : navSection[] = []//later on the dynamic role based functionality will be added

  const dashboardHome = getDefaultDashboardRoute(userInfo.role)

  return <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
}

export default DashboardSidebar

/*-------------- 1
Same as Navbar I will create a client component file for sidebar content.

1. I will make this a async-await component and copy-paste the UserInfo as Dashboard navbar
2. Call the DashboardSidebarContent and pass the userInfo as props
3. After Passing the props I will start coding on DashboardSidebarContent

4. Declare NavItems [add navSection as type] and Dashboard Home Variable and pass as props to DashboardSidebarContent, 

*/