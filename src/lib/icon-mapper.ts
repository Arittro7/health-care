import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react"

export const getIconComponent = (iconName : string) : LucideIcon =>{

  const IconComponent = Icons[iconName as keyof typeof Icons]

  if(!IconComponent){
    return Icons.HelpCircle
  }

  return IconComponent as LucideIcon
}



/*
1. I will import all the available icons from lucide using * and named it as icons.

2. Now I will use all those icons on Sidebar which was commented 
 2.1 - DashboardSidebarContent
 2.2 - Mobile Sidebar

[Note: Icons name already declared on navItems.config.ts file]
*/ 