import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import {getServerSession} from "next-auth";
import SessionProvider from "@/app/components/SessionProvider";
import { Toaster} from 'sonner'
import {Providers} from "./providers";
import NavbarComponent from "@/app/components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CreativeBox",
    description: "CreativeBox",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession()
    return (
        <html lang="en">
        <body className={rubik.className}>
        <SessionProvider session={session}>
            <Toaster richColors position={'top-center'}/>
            <Providers>
                <NavbarComponent />
                {children}
            </Providers>
        </SessionProvider>
        </body>
        </html>
    );
}
