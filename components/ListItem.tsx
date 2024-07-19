'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
    name: string;
    image: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({name, image, href}) => {
    const router = useRouter();

    const onClick = () => {
        // Add authentication before push
        router.push(href);
    }

    return (
        <button onClick={onClick}
        className="flex items-center relative group rounded-md
        overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20
        transition pr-4">
            <div className="relative">
                <Image 
                className="object-cover"
                src={image}
                alt="Image"
                width={64}
                height={64}
                />
            </div>
            <p className="font-medium truncate py-4">{name}</p>
            <div className="flex items-center justify-center 
            absolute transition opacity-0 rounded-full bg-green-400 p-4 drop-shadow-md
            right-5 group-hover:opacity-100 hover:scale-110">
                <FaPlay size={12}/>
            </div>
        </button>
    );
}

export default ListItem;