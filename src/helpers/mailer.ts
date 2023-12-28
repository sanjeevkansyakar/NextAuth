import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "91eee83b248a30",
                pass: "5288cc811d321c",
            },
        });

        const mailOptions = {
            from: "sanju25@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<h1>${
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password"
            }</h1>
            <br />
            <br />
            <p>Click <a href="${process.env.DOMAIN}/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password"
            } or copy and paste the link below in your browser. <br> ${
                process.env.DOMAIN
            }/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}</p>
            <br />
            <br />
            <a style="background-color:black;color:white;padding:8px;text-decoration:none" href="${
                process.env.DOMAIN
            }/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}">${
                emailType === "VERIFY" ? "Verify" : "Reset password"
            }</a>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
