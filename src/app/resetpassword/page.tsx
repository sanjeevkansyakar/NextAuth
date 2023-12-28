"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { MdOutlineToken } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            await axios.post("/api/users/resetpassword", {
                token,
                newPassword,
                confirmPassword,
            });
            toast.success("Password updated successfully.");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center relative w-[580px] h-[500px] bg-transparent border-2 border-white border-opacity-50 rounded-2xl backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)] text-center">
            <div className="w-full p-10">
                <h1 className="text-3xl font-semibold text-primary mb-6">
                    Reset Password
                </h1>

                <h2 className="p-2 bg-gray-200 rounded-md text-sm">
                    {token ? `${token}` : "No token"}
                </h2>
                <div className="form-div">
                    <span className="input-icon">
                        <MdOutlineToken />
                    </span>
                    <input
                        className="form-input"
                        required
                        id="token"
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <label className="input-label" htmlFor="token">
                        Token
                    </label>
                </div>

                <div className="form-div">
                    <span className="input-icon">
                        <FaUnlock />
                    </span>
                    <input
                        className="form-input"
                        required
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label className="input-label" htmlFor="newPassword">
                        New Password
                    </label>
                </div>

                <div className="form-div">
                    <span className="input-icon">
                        <RiLockPasswordFill />
                    </span>
                    <input
                        className="form-input"
                        required
                        id="comfirmPass"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label className="input-label" htmlFor="comfirmPass">
                        Comfirm Password
                    </label>
                </div>
                <button onClick={resetPassword} className="submit-btn">
                    Reset Password
                </button>

                <div className="text-white text-center mt-6 hover:underline">
                    <Link href="/login">Go to the Login Page</Link>
                </div>
            </div>
        </div>
    );
}
