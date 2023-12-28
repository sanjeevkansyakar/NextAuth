"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { IoMail, IoLockClosed } from "react-icons/io5";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/login", user);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            toast.error(`Login failed ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="relative w-[400px] h-[440px] bg-transparent border-2 border-white border-opacity-50 rounded-2xl backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex justify-center items-center">
            <div className="w-full p-10">
                <h2 className="text-3xl text-primary text-center font-semibold mb-6">
                    {loading ? "Login..." : "Login"}
                </h2>

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
                <div className="text-primary text-[0.9rem] text-right font-medium mb-4 hover:underline">
                    <Link href="/forgotPassword">Forgot Password?</Link>
                </div>
                <button
                    onClick={onLogin}
                    className="submit-btn"
                    disabled={buttonDisabled}
                >
                    Login here
                </button>

                <div className="text-[0.9rem] text-primary text-center font-medium mt-6 mb-[10px]">
                    <p>
                        Dont have an account?{" "}
                        <Link
                            className="text-primary font-semibold hover:underline"
                            href="/signup"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
