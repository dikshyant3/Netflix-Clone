import React from "react";
import { FaPlay } from "react-icons/fa6";
import FavoriteButton from "./FavoriteButton";

// import Image from 'next/image';

interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard = ({ data }: MovieCardProps) => {
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img
                className="cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]"
                src={data.thumbnailUrl}
                alt="Thumbnail"
            />
            <div
                className="opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100"
            >
                <img
                    src={data.thumbnailUrl}
                    alt="Movie"
                    className="object-cover cursor-pointer transition duration w-full h-[12vw] shadow-xl rounded-t-md"
                />
                <div className="z-10 bg-zinc-800 p-2 absolute w-full transition shadow-md rounded-b-md lg:p-4 ">
                    <div className="flex items-center gap-3">
                        <div className="cursor-pointer w-6 h-6 bg-white rounded-full flex items-center justify-center transition lg:w-10 lg:h-10 hover:bg-neutral-300" onClick={() => { }}>
                            <FaPlay size={20} />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                    </div>
                    <p className="text-green-400 font-semibold mt-5">
                        New <span className="text-white ">2024</span>
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
