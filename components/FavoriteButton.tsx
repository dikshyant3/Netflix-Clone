"use client";

import React, { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorite from "@/hooks/useFavorite";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
    const { mutate: mutateFavorites } = useFavorite();
    const { data: currentUser, mutate } = useCurrentUser();

    const favoriteIds = useMemo(() => (currentUser?.favoriteId || []), [currentUser]);

    const isFavorite = useMemo(() => favoriteIds.includes(movieId), [favoriteIds, movieId]);
    const addToFavorites = useCallback(async () => {
        try {
            let response;
            response = await axios.post("/api/favorite", { movieId });
            favoriteIds.push(movieId);
            mutate({ ...currentUser, favoriteId: favoriteIds });
            mutateFavorites();
        } catch (error) {
            console.error("Error toggling favorites:", error);
        }
    }, [movieId, currentUser, favoriteIds, mutate, mutateFavorites]);

    const removeFromFavorites = useCallback(async () => {
        try {
            let response;
            response = await axios.delete(`/api/favorite/${movieId}`, { data: { movieId } });
            favoriteIds.splice(favoriteIds.indexOf(movieId), 1);
            mutate({ ...currentUser, favoriteId: favoriteIds });
            mutateFavorites();
        } catch (error) {
            console.error("Error toggling favorites:", error);
        }
    }, [movieId, currentUser, favoriteIds, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

    return (
        <div onClick={isFavorite ? removeFromFavorites : addToFavorites}
            className="w-6 h-6 group/item flex items-center justify-center cursor-pointer border-2 border-white rounded-full transition hover:border-neutral-300 lg:w-10 lg:h-10 "
        >
            {/* {isFavorite ? (
                <AiOutlineCheck className="text-white" size={25} />
            ) : (
                <AiOutlinePlus className="text-white" size={25} />
            )} */}
            <Icon className="text-white" size={25} />
        </div>
    );
};

export default FavoriteButton;

