
import { getServerSession } from "next-auth";
import { ProfileCard } from "../components/ProfileCard";
import db from "@/app/db";
import { authConfig } from "../lib/auth";
import ClientOnlyComponent from "../components/ClientOnlyComponent";

async function getUserWallet() {
    const session = await getServerSession(authConfig);

    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select: {
            publicKey: true,
            privateKey:true,
        }
    })

    if (!userWallet) {
        return {
            error: "No solana wallet found associated to the user"
        }
    }

    return {error: null, userWallet};
}

export default async function Dashboard() {
    const userWallet = await getUserWallet();

    if (userWallet.error || !userWallet.userWallet?.publicKey) {
        return <>No solana wallet found</>
    }
    const privateKeyArray = userWallet.userWallet.privateKey
  .split(',')
  .map((numStr: string) => parseInt(numStr, 10));


    return <div>
        <ProfileCard publicKey={userWallet.userWallet?.publicKey} />
        <ClientOnlyComponent publicKey={userWallet.userWallet?.publicKey as string} privateKey={privateKeyArray} />
    </div>
}