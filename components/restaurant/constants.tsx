import { Icon } from "@iconify/react";

import { SideNavItem } from "@/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/restaurant/dashboard",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Student Login",
    path: "/projects",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
  },
  {
    title: "Recieved Orders",
    path: "/messages",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "Manage Products",
    path: "/restaurant/manage",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
  },
  {
    title: "Manage Sales",
    path: "/help",
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Icon icon="l" width="24" height="24" />,
  },
];
