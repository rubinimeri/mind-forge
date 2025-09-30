"use client"

import { useTheme } from "next-themes";
import * as React from "react";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <a href={"/"} className={"overflow-hidden"}>
      <img src={`${theme === "light" ? "/horizontal-logo.png" : "/white-horizontal-logo.png"}`} alt="" className={"min-w-[90px] w-[120px] "}/>
    </a>
  )
}