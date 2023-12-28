import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NextAuth | Authenticate yourself",
    description: "NextAuth is just a authenticate system",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} flex justify-center items-center min-h-screen bg-[url("../../public/background.jpg")] bg-no-repeat bg-cover bg-center`}
            >
                <Navbar />
                {children}

                <Toaster position="top-center" />
            </body>
        </html>
    );
}
