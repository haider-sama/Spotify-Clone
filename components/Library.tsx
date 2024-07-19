import useAuthModal from "@/hooks/use-auth-modal";
import useUploadModal from "@/hooks/use-upload-modal";
import { useUserHook } from "@/hooks/use-user";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/use-onplay";
import useSubscribeModal from "@/hooks/use-subscribe-modal";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({songs}) => {
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const {user, subscription} = useUserHook();
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        // Handle Upload.
        if(!user) {
            return authModal.onOpen();
        }

        // Check for subscription.
        // if (!subscription) {
        //     return subscribeModal.onOpen();
        // }

        return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 pt-4">
                <div className="items-center inline-flex gap-x-2">
                    <TbPlaylist size={24} className="text-neutral-400"/>
                    <p className="text-neutral-400 text-md font-medium">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus size={24}
                onClick={onClick}
                className="text-neutral-400 cursor-pointer hover:text-white transition"/>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-4">
                {songs.map((item) => (
                    <MediaItem
                    onClick={(id: string) => onPlay(id)}
                    key={item.id}
                    data={item} />
               ))}
            </div>
        </div>
    );
}

export default Library;