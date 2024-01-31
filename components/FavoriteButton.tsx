import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorite from '@/hooks/useFavorite';
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";



interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
    const { mutate: mutateFavorites } = useFavorite();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId } });
        }
        else {
            response = await axios.post('/api/favorite', { movieId })
        }
        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds,
        })
        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

    return (
        <div onClick={toggleFavorites} className='w-6 h-6 group/item flex items-center justify-center cursor-pointer border-2 border-white rounded-full transition hover:border-neutral-300 lg:w-10 lg:h-10 '>
            <Icon className='text-white' size={25} />
        </div>
    )
}

export default FavoriteButton