import { navSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): navSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    //Common Nav: all those commonly protected route are
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["PATIENT", "DOCTOR", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["PATIENT", "DOCTOR", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          roles: ["PATIENT"],
        },
      ],
    },
  ];
};

// Owner base protected route 👇🏼
export const doctorNavItems: navSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "Appointments",
        href: "/doctor/dashboard/appointments",
        icon: "Calendar", // ✅ String
        badge: "3",
        roles: ["DOCTOR"],
      },
      {
        title: "My Schedules",
        href: "/doctor/dashboard/my-schedules",
        icon: "Clock", // ✅ String
        roles: ["DOCTOR"],
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/prescriptions",
        icon: "FileText", // ✅ String
        roles: ["DOCTOR"],
      },
    ],
  },
];

export const patientNavItems: navSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-appointments",
        icon: "Calendar", // ✅ String
        roles: ["PATIENT"],
      },
      {
        title: "Book Appointment",
        href: "/consultation",
        icon: "ClipboardList", // ✅ String
        roles: ["PATIENT"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText", // ✅ String
        roles: ["PATIENT"],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity", // ✅ String
        roles: ["PATIENT"],
      },
    ],
  },
];

export const adminNavItems: navSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Doctors",
        href: "/admin/dashboard/doctors-management",
        icon: "Stethoscope", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Patients",
        href: "/admin/dashboard/patients-management",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Specialties",
        href: "/admin/dashboard/specialties-management",
        icon: "Hospital", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];


export const getNavItemsByRole = (role: UserRole): navSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "DOCTOR":
            return [...commonNavItems, ...doctorNavItems];
        case "PATIENT":
            return [...commonNavItems, ...patientNavItems];
        default:
            return [];
    }
}

/*
After Completing this I will use this function on DashboardSidebarContent file 📂src\components\modules\Dashboard\DashboardSidebar.tsx
*/