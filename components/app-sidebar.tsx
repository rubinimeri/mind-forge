import * as React from "react"
import { headers } from "next/headers";
import {
  Home,
  LayoutDashboard,
  ChartArea,
  Kanban
} from "lucide-react";

import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user";
import { auth } from "@/auth";


const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
          icon: <Home />,
        },
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <LayoutDashboard />
        },
        {
          title: "Insights",
          url: "/insights",
          icon: <ChartArea />
        },
        {
          title: "Kanban",
          url: "/kanban",
          icon: <Kanban />,
        },
      ],
    },
  ],
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const session = await auth()
  if (!session) return null

  const { user } = session

  const headersList = await headers();
  const pathname = headersList.get('x-pathname')

  return (
    <Sidebar collapsible={"icon"} {...props}>
      <SidebarHeader>
        <a href={"/"} className={"overflow-hidden"}>
          <img src="/horizontal-logo.png" alt="" className={"min-w-[90px] w-[120px] "}/>
        </a>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.url === pathname}
                    >
                      <a href={item.url}>
                        {item.icon}{item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: `${user.name} ${user.lastName || ''}`,
            email: user.email,
            avatar: "https://ui.shadcn.com/avatars/shadcn.jpg"
          }}
        />
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
