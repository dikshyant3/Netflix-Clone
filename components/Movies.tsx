"use client";

import useFavorite from "@/hooks/useFavorite";
import MovieList from "./MovieList";
import useMovieList from "@/hooks/useMovieList"

export default function Movies() {
    const { data: movies } = useMovieList()
    const { data: favorites } = useFavorite()

    return (
        <>
            <MovieList data={movies} title="Trending Now" />
            <MovieList data={favorites} title="My List" />
        </>
    )
}
