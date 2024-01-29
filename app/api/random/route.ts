import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest,NextApiResponse } from 'next';

export async function handler(req:NextApiRequest, res:NextApiResponse){
    try {
        await serverAuth(req,res);
        const moviesCount = await prismadb.movie.count()
        const randomIndex = Math.floor(Math.random() * moviesCount)

    } catch (error) {
        
    }
}