"use client";

import { signIn, useSession } from "next-auth/react"
import { SecondaryButton } from "./Button"
import { useRouter } from "next/navigation";

export const Hero = () => {
    const session = useSession();
    const router = useRouter();

    return <div className="flex overflow-y-hidden justify-center flex-col items-center max-w-[820px] mt-10 max-sm:mt-2">

        <div className="relative z-40 text-white flex items-center justify-center mb-12  rounded-full bg-gradient-to-r from-green-400 to-green-600">

            <div className="w-full bg-black h-full text-sm m-[1.5px] rounded-full py-1 px-4">

                Welcome to Ace
            </div>
        </div>
        <div className="absolute w-32 bg-400 h-10 bg-green-400 blur-2xl z-0 top-[250px]"></div>
        <div className="pointer-events-none max-sm:hidden">
            <img
  src="/full.svg"
  width={300}
  className="absolute top-56 left-64 max-sm:left-60 z-0 opacity-10"
  alt="full"
/>
<img
  src="/full.svg"
  width={300}
  className="absolute top-56 left-64 max-sm:left-4 z-0 blur-2xl"
  alt="full"
/>

<img
  src="/full.svg"
  width={300}
  className="absolute top-56 right-64 max-sm:right-4 z-0 opacity-10"
  alt="full"
/>
<img
  src="/full.svg"
  width={300}
  className="absolute top-56 right-64 max-sm:right-4 z-0 blur-2xl"
  alt="full"
/>

        </div>
        <div className="text-5xl font-medium text-white/90 w-fit text-center z-40 ">

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight z-40 max-sm:text-2xl">
                Powering <span className="text-white">The Indian Cryptocurrency Revolution</span>
            </h1>

        </div>
        <div className="flex justify-center pt-4 text-md z-50 text-white/70 max-sm:text-xs text-center">
            Create a frictionless wallet from India with just a Google Account.
        </div>
        <div className="flex justify-center pt-1 z-50 text-white/70 text-md max-sm:text-xs">
            Convert your INR into Cryptocurrency
        </div>
        <div className="pt-8 flex justify-center">
            {session.data?.user ? <SecondaryButton onClick={() => {
                router.push("/dashboard");
            }}>Go to Dashboard</SecondaryButton> : <SecondaryButton onClick={() => {
                console.log("calling goolge")
                signIn("google", { callbackUrl: "/dashboard" });
            }}>Login with Google</SecondaryButton>}
        </div>
    </div>
}