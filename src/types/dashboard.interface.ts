import { UserRole } from "@/lib/auth-utils";

export interface NavItem {
  title: string;
  href: string;
  icon: string; //change from lucide icon to string
  badge?: string;
  description?:string;
  roles: UserRole[]
}

export interface navSection {
  title?: string;
  items: NavItem[];
}


/* ---3
its navItem and navItems used on DashboardSidebarContent
*/ 