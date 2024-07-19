'use client';

import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps {
    label: string;
    icon: IconType;
    active?: boolean;
    href: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({label, icon: Icon, active, href}) => {

    return (
        <Link href={href}
        className={twMerge(`flex flex-row h-auto items-center gap-x-4 text-md
        font-medium cursor-pointer text-neutral-400 hover:text-white transition 
        py-1`, active && "text-white")}>
            <Icon size={24} />
            <p className="truncate w-full">{label}</p>
        </Link>
    );
}

export default SideBarItem;