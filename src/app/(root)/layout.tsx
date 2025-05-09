import Header from "@/components/landing/Header";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "UI Component Library (Xui) ",
    description: "Designed and Created by Shivraj Soni"
}

export default function RootLayout ({children}:{children:React.ReactNode}){
    return (
        <>
        <Header/>
        <main className="relative w-full pt-0 md:pt-0 bg-white dark:bg-black">
            {children}
        </main>
        <Footer/>
        </>
    )
}