import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import useBillboard from "@/hooks/useBillboard";

export async function GET() {
  const { data } = useBillboard();
  try {
    const { currentUser } = await serverAuth();
    const movieId = data.id;

    const favoriteMovie = await prismadb.movie.findMany({
      where: {
        id: {
            in: currentUser?.favoriteIds,
        }
      },
    });
    return Response.json(favoriteMovie, { status: 200 });
  } catch (error) {
    console.log(error);
    Response.json({error,status:500})
  }
}

