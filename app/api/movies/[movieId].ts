import prismadb from "@/lib/prismadb"
import serverAuth from "@/lib/serverAuth"
import useBillboard from "@/hooks/useBillboard";


export default async function handler(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data} = useBillboard();
    try {
        await serverAuth()
        const movieId = data.id
        console.log(movieId)
        if (typeof movieId !== 'string'){
            throw new Error('Invalid Id')
        }
        if (!movieId){
            throw new Error('Missing Id')
        }

        const movies = await prismadb.movie.findUnique({
            where: {
              id: movieId
            }
          });
        return Response.json(movies,{status: 200})
    } catch (error) {
        console.log(error)
        return Response.json({error: error,status:500})
    }
}