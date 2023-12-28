"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data._id);
    };
    return (
        <div className="flex flex-col items-center justify-center w-[350px] h-[350px] border-white border-2 rounded-lg shadow-2xl bg-transparent backdrop-blur-xl gap-3">
            <h1 className="text-3xl text-primary font-semibold underline">
                Profile
            </h1>

            <p className="text-xl">Profile page</p>
            <h2 className="px-4 py-2 rounded bg-green-500">
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Detail
            </button>
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                LogOut
            </button>
        </div>
    );
}
