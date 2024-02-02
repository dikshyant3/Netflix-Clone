import React from 'react'
import { FaPlay } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

interface PlayButtonProps {
    movieId: string;
}

function PlayButton({ movieId }: PlayButtonProps) {
    return (
        <button>Play</button>
    )
}

export default PlayButton