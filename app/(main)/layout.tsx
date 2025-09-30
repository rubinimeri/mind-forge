import React from 'react';
import { headers } from "next/headers";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {ToggleThemeButton} from "@/components/toggle-theme-button";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const path = headersList.get("x-pathname");
  const formattedPath = `${path?.charAt(1).toUpperCase()}${path?.slice(2)}`

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
          <span className={"tracking-wider text-sm"}>{path === "/" ? "Home" : formattedPath}</span>
          <ToggleThemeButton />
          {path === '/dashboard' && (
            <>
              <form className={"ml-auto"} >
                <Input
                  className={"placeholder:text-gray-600"}
                  type={"search"}
                  placeholder={"Search Thoughts..."}/>
              </form>
              <form >
                <Select defaultValue={"all"} >
                  <SelectTrigger className="w-[180px] border-inherit border-2 text-gray-600">
                    <SelectValue placeholder="Filter" className={"text-gray-600"} />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="all" >All</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </>
          )}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;