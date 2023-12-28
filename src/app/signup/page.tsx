"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { IoMail, IoLockClosed } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/signup", user);
            toast.success("Register successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error(`Signup failed ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="relative w-[400px] h-[440px] bg-transparent border-2 border-white border-opacity-50 rounded-2xl backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-center items-center">
            <div className="w-full p-10">
                <h2 className="text-3xl text-primary text-center font-semibold mb-6">
                    {loading ? "Registering..." : "Signup"}
                </h2>

                <div className="form-div">
                    <span className="input-icon">
                        <FaUser />
                    </span>
                    <input
                        className="form-input"
                        required
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                    />
                    <label className="input-label" htmlFor="username">
                        username
                    </label>
                </div>
                <div className="form-div">
                    <span className="input-icon">
                        <IoMail />
                    </span>
                    <input
                        className="form-input"
                        required
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    <label className="input-label" htmlFor="email">
                        email
                    </label>
                </div>
                <div className="form-div">
                    <span className="input-icon">
                        <IoLockClosed />
                    </span>

                    <input
                        className="form-input"
                        required
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                    <label className="input-label" htmlFor="password">
                        password
                    </label>
                </div>
                <button
                    onClick={onSignup}
                    className="submit-btn"
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "No signup" : "Signup"}
                </button>

                <div className="text-[0.9rem] text-primary text-center font-medium mt-6 mb-[10px]">
                    <p>
                        Already have an account?{" "}
                        <Link
                            className="text-primary font-semibold hover:underline"
                            href="/login"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
