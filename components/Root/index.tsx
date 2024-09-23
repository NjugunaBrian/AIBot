"use client"
import { useEffect } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils"
import { useMessages } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });

type Props = {
    children: React.ReactNode
}


const Root = ({children}: Props) => {
    useEffect(() => {
        useMessages.persist.rehydrate();
    },[])

    return (
        <html lang="en" className={'dark'}>
            <body className={cn(inter.className, 'dark:bg-zinc-900')} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>

    )
}

export default Root