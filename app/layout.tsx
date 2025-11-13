import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindForge",
  description: "Productivity tool & thought organizer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.task.deleteMany({
          where: {
            AIResponse: { thought: { userId: session.user.id, saved: false } },
          },
        });
        await tx.aIResponse.deleteMany({
          where: { thought: { userId: session.user.id, saved: false } },
        });
        await tx.thought.deleteMany({
          where: { userId: session.user.id, saved: false },
        });
      });
    } catch (err) {
      console.error("Failed to delete unsaved thoughts: ", err);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
