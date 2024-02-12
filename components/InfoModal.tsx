"use client"

import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import useInfoModal from "@/hooks/useInfoModal";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
}

const InfoModal = ({ visible, onClose }: InfoModalProps) => {
    const [isVisible, setIsVisible] = useState(!!visible);

    const { movieId } = useInfoModal();
    const { data = {} } = useMovie(movieId);

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible])

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300)

    }, [])

    if (!visible) {
        return null
    }

    return (
        <div className="fixed flex justify-center items-center bg-black bg-opacity-80 overflow-x-hidden overflow-y-auto inset-0 z-50 transition duration-300">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                        <video className="w-full h-full brightness-[60%] object-cover" autoPlay muted loop poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
                        <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
                            <AiOutlineClose className="text-white" size={20} />
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl font-bold mb-8 md:text-4xl lg:text-5xl">
                                {data?.title}
                            </p>
                            <div className="flex items-center gap-4">
                                <PlayButton movieId={data?.id} />
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8">
                        <div className="flex items-center gap-4 mb-8">
                            <p className="text-green-400 font-semibold text-lg">
                                New
                            </p>
                            <p className="text-white text-lg">
                                {data?.duration}
                            </p>
                            <p className="text-white text-lg">
                                {data?.genre}
                            </p>
                        </div>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InfoModal