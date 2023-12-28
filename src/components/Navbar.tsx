"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
    const router = useRouter();

    const checkCookie = (cookieName: string) => {
        const cookies = document.cookie.split(";");
        return cookies.some((cookie) =>
            cookie.trim().startsWith(`${cookieName}=`)
        );
    };

    // Check if a cookie named "accessToken" exists
    const accessTokenExists = checkCookie("token");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full px-6 sm:px-[100px] py-5 flex justify-between items-center z-50">
            <h2 className="text-white text-2xl sm:text-3xl">
                <Link href="/">NextAuth</Link>
            </h2>

            <nav>
                <Link className="navLinks" href="/">
                    Home
                </Link>
                <Link className="navLinks" href="/profile">
                    profile
                </Link>
                {accessTokenExists ? (
                    <button
                        onClick={logout}
                        className="w-[130px] h-[50px] bg-transparent outline-none border-2 border-white rounded-md cursor-pointer text-[1.1em] font-medium ml-5 sm:ml-10 transition duration-500 text-white hover:bg-white hover:text-primary"
                    >
                        Logout
                    </button>
                ) : (
                    <button className="w-[90px] h-[40px] sm:w-[130px] sm:h-[50px] bg-transparent outline-none border-2 border-white rounded-md cursor-pointer text-[1.1em] font-medium ml-5 sm:ml-10 transition duration-500 text-white hover:bg-white hover:text-primary">
                        <Link href="/login">Login</Link>
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
