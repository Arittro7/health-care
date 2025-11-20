"use client"

import { UserInfo } from "@/types/User.interface"

interface DashboardNavbarContentProps {
  userInfo: UserInfo | null
}

const DashboardNavbarContent = ({userInfo} : DashboardNavbarContentProps) => {
  return (
    <div>DashboardNavbarContent</div>
  )
}

export default DashboardNavbarContent
