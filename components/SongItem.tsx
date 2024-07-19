'use client';

import useLoadImage from "@/hooks/use-load-image";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({data, onClick}) => {
    const imagePath = useLoadImage(data);


    return (
        <div onClick={() => onClick(data.id)}
        className="flex flex-col items-center justify-center rounded-md group relative 
        overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10
        transition p-4">
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image className="object-cover"
                src={imagePath || "/images/liked.png"}
                fill
                alt="Image"
                />
            </div>
            <div className="flex flex-col items-start w-full p-4 gap-y-1">
                <p className="font-semibold truncate w-full">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm pb-4 truncate w-full">
                    By {data.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-6">
                <PlayButton />
            </div>
        </div>
    )
}

export default SongItem;