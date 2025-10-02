"use client"

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export default function Logo({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  className?: string;
}) {
  const { theme } = useTheme();

  return (
    <a
      href={"/"}
      className={"overflow-hidden"}
    >
      <Image
        className={cn("min-w-[90px]", className)}
        {...props}
        src={`${theme === "light" ? "/horizontal-logo.png" : "/white-horizontal-logo.png"}`}
        alt="logo"
      />
    </a>
  )
}