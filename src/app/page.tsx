import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col justify-center items-center w-1/2 text-2xl backdrop-blur-lg p-5 rounded-2xl">
            <p>
                NextAuth is just an authentication system, its a user
                verification powerhouse. Users can easily authenticate
                themselves through email, sign up, log in, and even reset their
                passwords.
            </p>
            <br />
            <p>
                I created this system as part of my journey to learn the Next.js
                framework. Leveraging the power of MongoDB and Mailtrap for
                email services, it's been an enriching experience.
            </p>
        </main>
    );
}
