import { Song } from "@/types";
import useAuthModal from "./use-auth-modal";
import usePlayer from "./use-player"
import { useUserHook } from "./use-user";
import useSubscribeModal from "./use-subscribe-modal";


const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const { user, subscription } = useUserHook();

    const onPlay = (id: string) => {
        if(!user) {
            return authModal.onOpen();
        }
        
        // Check for subscription.
        // if(!subscription) {
        //     return subscribeModal.onOpen();
        // }

        player.setId(id);
        player.setIds(songs.map((song) => song.id))
    }

    return onPlay;
}

export default useOnPlay;