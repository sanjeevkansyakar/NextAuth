import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword, confirmPassword } = reqBody;

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        const user = await User.findOneAndUpdate(
            {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: { $gt: Date.now() },
            },
            {
                password: hashedPassword,
            },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { error: "Invalid token. Please provide right token." },
                { status: 400 }
            );
        }

        const response = NextResponse.json({
            message: "Password reset successfully",
            success: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
