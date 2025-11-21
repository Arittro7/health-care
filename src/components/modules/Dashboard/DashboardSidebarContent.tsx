"use client"

import { navSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface"

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: navSection[];
  dashboardHome:string
}

const DashboardSidebarContent = ({userInfo, navItems, dashboardHome}) => {
  return (
    <div>DashboardSidebarContent</div>
  )
}

export default DashboardSidebarContent

/* ------------2
1. Define Interface
2. Create a define navSection interface on 📂src\types\dashboard.interface.ts
3. I excepting to receive 3 Props (userInfo, navItems, dashboardHome) here I have to pass all of them from DashboardSidebar[userInfo already passed from there😉]

5:36
*/