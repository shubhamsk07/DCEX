import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { useSession } from "next-auth/react";
import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { useConnection } from "@/app/ConnectionContext";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection } from "@/app/lib/constants";

export async function POST(req:NextRequest){
    const session = await getServerSession(authConfig);
     console.log(session)
        if (!session?.user) {
            return NextResponse.json({
                message: "You are not logged in"
            }, {
                status: 401
            })
        }
     const solWallet = await db.solWallet.findFirst({
        where:{
            userId:session.user.uid
        }
    })
    if(!solWallet)return
    const publicKey = new PublicKey(solWallet.publicKey)
    const {amount} = await req.json()

   const airdropSignature = await connection.requestAirdrop(publicKey,amount *LAMPORTS_PER_SOL);

   const latestBlockHash = await connection.getLatestBlockhash('finalized');
   await connection.confirmTransaction({
    blockhash:latestBlockHash.blockhash,
    lastValidBlockHeight:latestBlockHash.lastValidBlockHeight,
    signature:airdropSignature
   })
   const balance=await connection.getBalance(publicKey)
    console.log("balance",balance,amount)

    return NextResponse.json({
        message:"Airdrop success!"
    })

}