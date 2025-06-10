"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import { PrimaryButton } from "./Button";
import Image from "next/image";

export const Appbar = () => {
    const session = useSession();
    return <div className="mt-5 lg:mx-32 lg:my-4 mx-4 px-2 py-2 flex justify-between">
       <div className="flex flex-row-reverse items-center gap-1">
         <div className="text-white text-2xl font-[500] flex flex-col justify-center max-sm:text-lg">
            Ace
        </div>
        <div >
            <div className="w-6 ml-2 h-5 bg-green-500 absolute blur-lg"></div>
            <Image alt="full image" src="/full.svg" className="shadow-xl bg-transparent max-sm:w-6" width={35} height={35} />
        </div>
       </div>
        <div >
            {session.data?.user ? <PrimaryButton onClick={() => {
                signOut()
            }}>Logout</PrimaryButton> : <PrimaryButton onClick={() => {
                signIn("google",{callbackUrl:"/dashboard"})
            }}>Signin</PrimaryButton>}
        </div>
    </div>
}