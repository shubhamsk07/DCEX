'use client';

import { SessionProvider } from "next-auth/react"
import { useContext } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>
        {children}
    </SessionProvider>
}
