"use client"
import { Connection } from "@solana/web3.js";
import { createContext, useContext, useMemo, ReactNode } from "react"

const ConnectionContext = createContext<Connection | null>(null)

export const ConnectionProvider =({children}:{children:ReactNode}) =>{
    const connection = useMemo(()=>{
        return new Connection("https://devnet.helius-rpc.com/?api-key=5935eb6e-9c4e-4031-b4b6-f1290106d2d6")
    },[])

    return (
        <ConnectionContext.Provider value={connection}>
            {children}
        </ConnectionContext.Provider>
    )
}

export const useConnection = ()=>{
    const context = useContext(ConnectionContext)
    if(!context){
        throw new Error("useConnection must be used withing a connection Provider")
    }
    return context
}
