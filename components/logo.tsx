"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export default function Logo({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  className?: string;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const imageSrc =
    theme === "light" ? "/horizontal-logo.png" : "/white-horizontal-logo.png";

  console.log(theme);
  return (
    <Link href={"/"} className={"overflow-hidden"}>
      <Image
        className={cn("min-w-[90px]", className)}
        {...props}
        src={imageSrc}
        alt="logo"
      />
    </Link>
  );
}
