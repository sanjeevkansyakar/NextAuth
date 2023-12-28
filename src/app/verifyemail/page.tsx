"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
            toast.success("verified");
        } catch (error: any) {
            setError(true);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    });

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl text-primary font-semibold mb-4">
                Verify Email
            </h1>
            <h2 className="px-4 py-2 text-xl bg-transparent outline-none border-2 border-white rounded-md cursor-pointer font-medium transition duration-500 text-black hover:bg-white hover:text-primary mb-5">
                {token ? `${token}` : "No token"}
            </h2>

            {verified && (
                <div className="text-center">
                    <h2 className="text-2xl border-2 border-white px-4 py-2 rounded-md bg-green-400 mb-4">
                        Email Verified
                    </h2>
                    <Link
                        className="text-xl font-semibold mb-5 text-primary hover:underline"
                        href="/login"
                    >
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl px-4 py-2 bg-red-400 text-black">
                        Error
                    </h2>
                </div>
            )}
        </div>
    );
}
