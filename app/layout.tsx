
"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import {Appbar} from "./components/Appbar";
import { Providers } from "./providers";
import { usePathname } from "next/navigation"; 
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // use usePathname to get the current path

  // Check if the current path should bypass the global layout
  const showAppbar = !pathname.startsWith('/adapter/login');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {showAppbar && <Appbar />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
