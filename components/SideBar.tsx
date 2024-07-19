'use client';

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SideBarItem from "./SideBarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/use-player";
import { twMerge } from "tailwind-merge";

interface SideBarProps {
    children: React.ReactNode;
    songs: Song[];
}

const SideBar: React.FC<SideBarProps> = ({children, songs}) => {
    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(() => [
        {
            label: "Home",
            active: pathname !== "/search",
            href: "/",
            icon: HiHome
        },
        {
            label: "Search",
            active: pathname !== "/search",
            href: "/search",
            icon: BiSearch
        },
    ], [pathname]);

    return (
        <div className={twMerge(`flex h-full`, player.activeId && "h-[calc(100% - 80px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 py-4 px-4">
                        {routes.map((item) => (
                            <SideBarItem 
                            key={item.label}
                            {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="h-full overflow-y-auto">
                    <Library songs={songs} />
                </Box>
            </div>
            
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default SideBar;