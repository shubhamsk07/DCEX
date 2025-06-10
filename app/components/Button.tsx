"use client";

export const PrimaryButton = ({children, onClick}: {
    children: React.ReactNode,
    onClick: () => void
}) => {
    return <button onClick={onClick} type="button" className="text-white/90 border-2 border-green-600  rounded-full bg-green-500 px-6 py-2 text-sm max-sm:px-3 max-sm:text-xs">
        {children}
    </button>
}

export const SecondaryButton = ({children, onClick, prefix}: {
    children: React.ReactNode,
    onClick: () => void,
    prefix?: React.ReactNode
}) => {
    return <button onClick={onClick} type="button" className="text-white bg-green-500 hover:bg-green-600 focus:outline-none  font-medium rounded-full border-2 border-green-700  shadow-2xl text-sm max-sm:text-xs max-sm:px-4 max-sm:py-2 px-6 py-3 me-2 mb-2 flex">
    <div>
        {prefix}
    </div>
    <div>
        {children}
    </div>
</button>
}

export const TabButton = ({active, children, onClick}: {
    active: boolean;
    children: React.ReactNode,
    onClick: () => void
}) => {
    return <button type="button" className={`w-full text-white  focus:ring-blue-300 font-medium rounded-full text-sm max-sm:text-xs max-sm:px-0  max-sm:py-3 px-5 py-3  ${active && "bg-[#171d2c]"}`} onClick={onClick}>{children}</button>
}