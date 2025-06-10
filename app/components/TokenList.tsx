import Image from "next/image"
import { TokenWithbalance } from "../api/hooks/useTokens"


export function TokenList({tokens}: {
    tokens: TokenWithbalance[]
}) {
    return <div>
        {tokens.map(t => <TokenRow key={t.name} token={t} />)}
    </div>
}

function TokenRow({token}: {
    token: TokenWithbalance
}) {
    return <div className="flex justify-between  my-2 max-sm:text-sm">
        <div className="flex">
            <div>
                <Image alt='token image' src={token.image} width={10} height={10} className="h-10 w-10 rounded-full mr-2" />
            </div>
            <div>
                <div className="font-bold">
                    {token.name}
                </div>
                <div className="font-slim">
                    1 {token.name} = ~${Number(token.price).toFixed(4)}
                </div>
            </div>
        </div>
        <div>
            <div>
                <div className="font-bold flex justify-end">
                    {token.usdBalance}
                </div>
                <div className="font-slim flex justify-end">
                    {token.balance}
                </div>
            </div>
        </div>
    </div>
}