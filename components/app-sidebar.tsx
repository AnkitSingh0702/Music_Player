import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// react-icons and lucide-react
import { FaMusic } from "react-icons/fa";
import {
  House,
  TrendingUp,
  Music2Icon,
  BookHeadphones,
  Settings,
  LogOut,
} from "lucide-react";
import React from "react";
import { ModeToggle } from "./toggle";

// menu-items list
const items = [
  {
    title: "Home",
    icon: House,
  },
  {
    title: "Trends",
    icon: TrendingUp,
  },
  {
    title: "Library",
    icon: Music2Icon,
  },
  {
    title: "Discover",
    icon: BookHeadphones,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-row gap-3 p-3">
          <FaMusic color="#dc2626" size={30} className="mt-1" />
          <p className="text-2xl font-bold">
            <span className="text-red-600 text-2xl font-bold">Music</span>
            Player
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="p-3 cursor-pointer">
              <SidebarMenuButton>
                <a className="flex items-center gap-3 px-0">
                  <item.icon size={24} className="text-red-600" />
                  <span className="text-lg font-semibold">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroupLabel>General</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem className="p-3 cursor-pointer">
            <div className="flex flex-col gap-y-4">
              {/* Settings */}
              <SidebarMenuButton>
                <div className="flex items-center gap-3">
                  <Settings size={24} className="text-red-600" />
                  <span className="text-base font-medium">Settings</span>
                </div>
              </SidebarMenuButton>

              <div></div>

              {/* Log Out */}
              <div className="flex justify-between items-center">
                <SidebarMenuButton>
                  <div className="flex items-center gap-3">
                    <LogOut size={24} className="text-red-600" />
                    <span className="text-base font-medium">Log Out</span>
                  </div>
                </SidebarMenuButton>
                <div className="px-2">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
