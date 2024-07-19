import { FaPlay } from "react-icons/fa"

const PlayButton = () => {
    return (
        <button className="flex items-center bg-green-400 rounded-full opacity-0
        transition p-4 drop-shadow-md translate translate-y-4 group-hover:opacity-100
        group-hover:translate-y-0 hover:scale-110">
            <FaPlay className="text-black" />
        </button>
    )
}

export default PlayButton;