"use client";

import MovieList from "./MovieList";
import useMovies from "@/hooks/useMovieList"

export default function Movies() {
    const { data: movies } = useMovies()

    return (
        <>
            <MovieList data={movies} title="Trending Now" />

        </>
    )
}
