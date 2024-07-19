'use client';

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/use-auth-modal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserHook } from "@/hooks/use-user";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/use-player";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className}) => {
    const player = usePlayer();
    const router = useRouter();
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const { user, subscription} = useUserHook();

    const handlelogout = async () => {
        // Handle logout.
        const {error} = await supabaseClient.auth.signOut();
        // Reset any potentially playing songs.
        player.reset();
        router.refresh();

        if(error) {
            toast.error(error.message);
        }
    }
    return (
        <div className={twMerge(`bg-gradient-to-b from-emerald-800
        h-fit p-6`, className)}>
            <div className="flex items-center justify-between w-full mb-4">
                <div className="hidden md:flex items-center gap-x-2">
                    <button className="flex items-center justify-center cursor-pointer 
                    bg-black rounded-full transition"
                    onClick={() => router.back()}>
                        <RxCaretLeft size={32}
                        className="text-white"/>
                    </button>
                    <button className="flex items-center justify-center cursor-pointer 
                    bg-black rounded-full transition"
                    onClick={() => router.forward()}>
                        <RxCaretRight size={32}
                        className="text-white"/>
                    </button>
                </div>
                
                <div className="flex items-center gap-x-2 md:hidden">
                    <button className="flex items-center justify-center hover:opacity-75
                    transition rounded-full p-2">
                        <HiHome size={20} className="text-black"/>
                    </button>
                    <button className="flex items-center justify-center hover:opacity-75
                    transition rounded-full p-2">
                        <BiSearch size={20} className="text-black"/>
                    </button>
                </div>

                <div className="flex items-center justify-between gap-x-4">
                    {user ? (
                        <div className="flex items-center gap-x-4">
                            <Button onClick={handlelogout}
                            className="px-6 py-2 bg-white">
                                Logout
                            </Button>
                            <Button onClick={() => router.push("/account")}
                            className="bg-white">
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                    <>
                        <div>
                            <Button onClick={authModal.onOpen}
                            className="bg-transparent text-neutral-400 font-medium">
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button onClick={authModal.onOpen}
                            className="bg-white px-6 py-2">
                                Login
                            </Button>
                        </div>
                    </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;