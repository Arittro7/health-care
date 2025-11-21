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