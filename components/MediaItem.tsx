'use client';

import useLoadImage from "@/hooks/use-load-image";
import usePlayer from "@/hooks/use-player";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({data, onClick}) => {
    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    
    const handleClick = () => {
        if(onClick) {
            return onClick(data.id);
        }

        // Default turn on player.
        return player.setId(data.id);
    }

    return (
        <div onClick={handleClick}
        className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50
        w-full p-2 rounded-md">
            <div className="relative rounded-md min-h-[48px] min-w-[48px]
            overflow-hidden">
                <Image className="object-cover"
                src={imageUrl || "/images/liked.png"}
                fill
                alt="Media Item"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="truncate text-white">
                    {data.title}
                </p>
                <p className="truncate text-neutral-400 text-sm">
                    {data.author}
                </p>
            </div>
        </div>
    )
}

export default MediaItem;