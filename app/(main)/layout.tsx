import React from 'react';
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {headers} from "next/headers";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const path = headersList.get("x-pathname");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {path === "/" ? "Home" : path?.slice(1)}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;