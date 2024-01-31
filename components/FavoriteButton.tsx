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


    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteId || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    console.log("Favorite: ", isFavorite);


    const toggleFavorites = useCallback(async () => {
        try {
            let response;


            // if (!currentUser.favoriteId) {
            //     currentUser.favoriteId = [];
            // }

            // console.log("list: ", currentUser.favoriteId);


            if (!isFavorite) {
                response = await axios.post("/api/favorite", { movieId });
                currentUser.favoriteId.push(movieId);
            } else {
                response = await axios.delete(`/api/favorite/${movieId}`);
                currentUser.favoriteId = currentUser.favoriteId.filter((id: string) => id !== movieId);
            }
            console.log(currentUser.favoriteId);
            mutate({
                ...currentUser,
            });
            mutateFavorites();
        } catch (error) {
            console.error("Error toggling favorites:", error);
        }
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    return (
        <div
            onClick={toggleFavorites}
            className="w-6 h-6 group/item flex items-center justify-center cursor-pointer border-2 border-white rounded-full transition hover:border-neutral-300 lg:w-10 lg:h-10 "
        >
            {isFavorite ? (
                <AiOutlineCheck className="text-white" size={25} />
            ) : (
                <AiOutlinePlus className="text-white" size={25} />
            )}
        </div>
    );
};

export default FavoriteButton;
