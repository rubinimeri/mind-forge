import * as React from "react"
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
import {Home, LayoutDashboard, ChartArea, Kanban} from "lucide-react";
import {NavUser} from "@/components/nav-user";
import {auth} from "@/auth";

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
  if (!session?.user) return null

  const { user } = session
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <img src="/horizontal-logo.png" alt="" width={140}/>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <a href={item.url}>{item.icon}{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: `${user.name} ${user.lastName || ''}`, email: user.email, avatar: "https://ui.shadcn.com/avatars/shadcn.jpg" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
