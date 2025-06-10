import { useConnection } from "@/app/ConnectionContext";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { authConfig } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req:NextRequest){
    const connection = new Connection("https://devnet.helius-rpc.com/?api-key=5935eb6e-9c4e-4031-b4b6-f1290106d2d6")
    const {publicKey,amount} = await req.json();
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
   if (!solWallet) {
        return NextResponse.json({
            message: "Couldnt find associated solana wallet"
        }, {
            status: 401
        })
    }

    const keypair = getPrivateKeyFromDb(solWallet.privateKey)
    const balance = Number(connection.getBalance(new PublicKey(solWallet.publicKey)))/LAMPORTS_PER_SOL;

    if(amount > balance){
        NextResponse.json({message:"Insuffiecient balance"})
        return
    }
    const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey:keypair.publicKey,
            toPubkey:publicKey,
            lamports:amount*LAMPORTS_PER_SOL
        })
    )
    const signature = await sendAndConfirmTransaction(
        connection,
        transferTransaction,
        [keypair]
    )
    console. log ( "Transaction Signature:" , signature);
    NextResponse.json({signature:signature})
    return
}


function getPrivateKeyFromDb(privateKey: string) {
    const arr = privateKey.split(",").map(x => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
}