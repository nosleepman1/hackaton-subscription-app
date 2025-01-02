import {
  LayoutDashboard,
  Users,
  User
} from "lucide-react";

export const navItems = [
  {
    label: "Home",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Team",
    href: "/team",
    icon: Users,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  }
];

export const mobileNavItems = [
  navItems[0],
  navItems[1],
  navItems[2]
];