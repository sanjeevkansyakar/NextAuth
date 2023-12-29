"use client";

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Logout = ({ cookie }: { cookie: boolean }) => {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <>
            {cookie ? (
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
        </>
    );
};

export default Logout;
