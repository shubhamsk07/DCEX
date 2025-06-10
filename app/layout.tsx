
"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import {Appbar} from "./components/Appbar";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import { ConnectionProvider } from "./ConnectionContext";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();


  const showAppbar = !pathname.startsWith('/adapter/login');

  return (
    <html lang="en">
    <body className={`${inter.className} bg-[#090d14]`}>

        <Providers>
        <ConnectionProvider>
            {showAppbar && <Appbar />}
          {children}
        </ConnectionProvider>
        </Providers>
      </body>
    </html>
  );
}
