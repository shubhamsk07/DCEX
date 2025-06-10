"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton, TabButton } from "./Button";
import { useEffect, useState } from "react";
import { TokenWithbalance, useTokens } from "../api/hooks/useTokens";
import { TokenList } from "./TokenList";
import { Swap } from "./Swap";
import axios from "axios";
import Image from "next/image";

type Tab = "tokens" | "send" | "add_funds" | "swap" | "withdraw"
const tabs: { id: Tab; name: string }[] = [
    { id: "tokens", name: "Tokens" },
    { id: "send", name: "Send" },
    { id: "add_funds", name: "Add funds" },
    { id: "withdraw", name: "Withdraw" },
    { id: "swap", name: "Swap" },
];

export const ProfileCard = ({ publicKey }: {
    publicKey: string
}) => {
    const session = useSession();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<Tab>("tokens");
    const { tokenBalances, loading } = useTokens(publicKey);

    if (session.status === "loading") {
        // TODO: replace with a skeleton
        return <div>
            Loading...
        </div>
    }

    if (!session.data?.user) {
        router.push("/")
        return null
    }

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl max-sm:max-w-sm rounded-2xl shadow w-full">
            <Greeting
                image={session.data?.user?.image ?? ""}
                name={session.data?.user?.name ?? ""}
            />
            <div className="max-w-xl  rounded-full flex bg-[#0e121c] p-2  ">
                {tabs.map(tab => <TabButton key={tab.id} active={tab.id === selectedTab} onClick={() => {
                    setSelectedTab(tab.id)
                }}>{tab.name}</TabButton>)}
            </div>
            <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}><Assets tokenBalances={tokenBalances} loading={loading} publicKey={publicKey} /> </div>
            <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}><Swap tokenBalances={tokenBalances} publicKey={publicKey} /> </div>
            <div className={`${selectedTab === "send" ? "visible" : "hidden"}`}><Send /> </div>
            <div className={`${selectedTab === "add_funds" ? "visible" : "hidden"}`}><Airdrop /> </div>
            <div className={`${(selectedTab !== "swap" && selectedTab !== "tokens" && selectedTab !== "send" && selectedTab !== 'add_funds') ? "visible" : "hidden"}`}><Warning /> </div>
        </div>

    </div>
}

function Airdrop() {
    const [amount, setAmount] = useState<number>()
    const [loading,setLoading] = useState<boolean>()
    return <div className="bg-[#0e121c] text-white text-xl rounded-xl  py-8 px-12 flex flex-col mt-6">
        <div className="text-white text-2xl font-semibold max-sm:text-xl">
            Airdrop
        </div>
        <div className="mt-4 flex flex-col">
            <label className="text-sm max-sm:text-xs">Amount in SOL:</label>
            <input type="number" className="bg-transparent text-sm max-sm:text-xs focus:outline-none focus:ring-0 p-3 border-[#233662bc] rounded-xl mt-2 border-2 max-w-lg" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <div className="mt-4">
            {loading ?<PrimaryButton
            onClick={async()=>{
                alert('clicked')
                setLoading(true)
                await axios.post("/api/add_funds",{
                    amount:amount
                })

                setLoading(false)
            }}>
                Loading...
            </PrimaryButton>:
            <PrimaryButton
            onClick={async()=>{
                setLoading(true)
                await axios.post("/api/add_funds",{
                    amount:amount
                })

                setLoading(false)
            }}>
                Add
            </PrimaryButton>}
        </div>
    </div>
}

function Warning() {
    return <div className="bg-[#0e121c] text-white text-xl rounded-xl  py-32 px-10 flex justify-center mt-6">
        We dont yet support this feature
    </div>
}

function Send() {
    const [amount, setAmount] = useState<string>()
    const [publicKey, setPublicKey] = useState<string>()
    useEffect(() => {

    }, [])
    return <div className="bg-[#0e121c] text-white text-xl rounded-xl flex flex-col px-12 py-8 mt-6">
        <h1 className="text-2xl font-semibold max-sm:text-xl">Send</h1>

        <div className="flex flex-col gap-2">
            <label className="text-sm mt-4 max-sm:text-xs">Receiver&apos;s Public Key:</label>
            <input type="text" className="bg-transparent text-sm focus:outline-none focus:ring-0 p-3 border-[#233662bc] rounded-xl  border-2" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} />
            <label className="text-sm mt-2 max-sm:text-xs">Amount in SOL:</label>
            <input type="text" className="bg-transparent text-sm focus:outline-none focus:ring-0 p-3 border-[#233662bc] rounded-xl  border-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="mt-6 flex justify-end">
            <PrimaryButton
                onClick={async () => {
                    const response = await axios.post("/api/send", {
                        publicKey: publicKey,
                        amount: amount
                    })
                    console.log(response.data)
                }}
            >
                Send
            </PrimaryButton>
        </div>
    </div>
}

 function Assets({ publicKey, tokenBalances, loading }: {
    publicKey: string;
    tokenBalances: {
        totalBalance: number,
        tokens: TokenWithbalance[]
    } | null;
    loading: boolean;
}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            let timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    if (loading) {
        return "Loading..."
    }

    return <div className="text-slate-400 bg-[#0e121c] rounded-xl mt-6 ">
        <div className="mx-12 py-2 text-white/70 pt-8  max-sm:text-sm">
            Account assets
        </div>
        <div className="flex justify-between mx-12">
            <div className="flex">
                <div className="text-5xl font-bold text-white max-sm:text-3xl">
                    ${tokenBalances?.totalBalance}
                </div>
                <div className="font-slate-500 font-bold text-4xl max-sm:text-xl flex flex-col justify-end pb-0 pl-2">
                    USD
                </div>
            </div>

            <div>
                <PrimaryButton onClick={() => {
                    navigator.clipboard.writeText(publicKey)
                    setCopied(true)
                }}>{copied ? "Copied" : "Your wallet address"}</PrimaryButton>
            </div>
        </div>

        <div className="pt-4 p-12  mt-4  max-sm:mt-2">
            <TokenList tokens={tokenBalances?.tokens || []} />
        </div>
    </div>
}

function Greeting({
    image, name
}: {
    image: string, name: string
}) {
    return <div className="flex ml-1 py-6 max-sm:py-4">
        <Image alt='image new' src={image} width={32} height={32} className="rounded-full max-sm:w-8 max-sm:h-8 w-10 h-10 mr-4" />
        <div className="text-2xl max-sm:text-xl font-semibold flex flex-col justify-center text-white/80">
            Welcome back, {name}
        </div>
    </div>
}