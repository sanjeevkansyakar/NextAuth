import { FaUserCircle } from "react-icons/fa";

export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center w-[350px] h-[250px] border-white border-2 rounded-lg shadow-2xl bg-transparent backdrop-blur-xl gap-3">
            <h1 className="text-3xl text-primary font-semibold mb-5 flex flex-row">
                <span className="mr-4">
                    <FaUserCircle />
                </span>
                Profile
            </h1>
            <hr />
            <p className="text-lg text-center">
                Your profile page
                <span className="p-2 block rounded bg-primary text-white">
                    {params.id}
                </span>
            </p>
        </div>
    );
}
