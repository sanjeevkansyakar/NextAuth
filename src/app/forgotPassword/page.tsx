"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMail } from "react-icons/io5";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sendEmail, setSendEmail] = useState(false);

    const forgotPassword = async () => {
        try {
            await axios.post("/api/users/forgotPassword", { email });
            toast.success("Email sended successfully");
            setSendEmail(true);
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-[350px] h-[250px] border-white border-2 rounded-lg shadow-2xl bg-transparent backdrop-blur-xl gap-3 text-center">
            <div className="w-full p-10">
                <h1 className="text-3xl font-semibold text-primary mb-10">
                    Forget Password
                </h1>

                <div className="form-div">
                    <span className="input-icon">
                        <IoMail />
                    </span>
                    <input
                        className="form-input"
                        required
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // placeholder="Enter your email"
                    />
                    <label className="input-label" htmlFor="email">
                        Enter your email
                    </label>
                </div>
                <button onClick={forgotPassword} className="submit-btn">
                    {sendEmail ? "Mail Sended" : "Send Reset Password Email"}
                </button>
            </div>
        </div>
    );
}
