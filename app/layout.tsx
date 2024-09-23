import 'highlight.js/styles/github-dark.css'
import type { Metadata } from "next";
import "./globals.css";
import Root from "@/components/Root";


export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Root>{children}</Root>
  );
}
