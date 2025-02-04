import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import type { Viewport } from "next";
import SessionWrapper from "./components/SessionWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
