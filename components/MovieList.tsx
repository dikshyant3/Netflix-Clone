"use client";

import React from 'react'
import { isEmpty } from 'lodash'
import MovieCard from './MovieCard';
// import useMovies from "@/hooks/useMovieList"


interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

function MovieList({ data, title }: MovieListProps) {
    if (isEmpty(data)) {
        return null;
    }
    console.log(data)

    return (
        <div className='px-4 space-y-8 mt-4 md:py-12'>
            <div>
                <p className="text-white text-md font-semibold mb-4 md:text-xl lg:text-2xl">
                    {title}
                </p>
                <div className='grid grid-cols-4 gap-2'>
                    {data.map((movie) => (
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default MovieList