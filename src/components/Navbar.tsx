import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import Logout from "./Logout";

const Navbar = () => {
    const cookiesList = cookies();
    const hasCookie = cookiesList.has("token");

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
                <Logout cookie={hasCookie} />
            </nav>
        </header>
    );
};

export default Navbar;
