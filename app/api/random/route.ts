import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
// import { NextRequest,NextResponse } from 'next/server';

export async function handler(){
    try {
        await serverAuth();
        const moviesCount = await prismadb.movie.count()
        const randomIndex = Math.floor(Math.random() * moviesCount)

        const randomMovies = await prismadb.movie.findMany({
            take:1,
            skip:randomIndex,
        }) 
        return Response.json({status:200,message:randomMovies[0]}) 
    } catch (error) {
        return Response.json({status:401,message:"Internal Server Error"})
    }
}