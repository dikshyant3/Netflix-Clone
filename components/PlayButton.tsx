"use client"

import React from "react";
import { FaPlay } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface PlayButtonProps {
    movieId: string;
}

function PlayButton({ movieId }: PlayButtonProps) {
    // console.log("movieId is" ,movieId)
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(`/watch/${movieId}`)}
            className="bg-white
        flex
        items-center
        justify-center
        py-1
        px-2
        rounded-md
        w-auto
        text-xs
        md:py-2
        md:px-4
        lg:text-lg
        hover:bg-neutral-300
        transition"
        >
            <FaPlay className="mr-1" size={20} />
            Play
        </button>
    );
}

export default PlayButton;
