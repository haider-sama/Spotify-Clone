'use client';

import useAuthModal from "@/hooks/use-auth-modal";
import { useUserHook } from "@/hooks/use-user";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({songId}) => {
    const router = useRouter();
    const {supabaseClient} = useSessionContext();
    const authModal = useAuthModal();
    const {user} = useUserHook();
    const [isLiked, setIsLiked] = useState(false);
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    useEffect(() => {
        if(!user?.id) {
            return;
        }

        const fetchData = async () => {
            const {data, error} = await supabaseClient.from("liked_songs").select("*")
            .eq("user_id", user.id).eq("song_id", songId).single();
        

        if(!error && data) {
            setIsLiked(true);
        }
        }

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const handleLike = async () => {
        if(!user) {
            return authModal.onOpen();
        }

        if(isLiked) {
            const {error} = await supabaseClient.from("liked_songs").delete()
            .eq("user_id", user.id).eq("song_id", songId);

            if(error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } else {
            const {error} = await supabaseClient.from("liked_songs").insert({
                song_id: songId,
                user_id: user.id
            });
            if(error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success("Song added to favourites!")
            }
        }

        router.refresh();
    }


    return (
        <button className="hover:opacity-75 transition" onClick={handleLike}>
            <Icon color={isLiked ? "22c55e" : "white"} size={24}/>
        </button>
    )
}

export default LikeButton;