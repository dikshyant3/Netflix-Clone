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

    }, [onClose])

    if (!visible){
        return null
    }

    return (
        <div className="">

        </div>
    )
}

export default InfoModal