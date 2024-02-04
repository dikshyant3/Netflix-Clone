import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";


export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    const favoriteMovie = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteId,
        },
      },
    });
    return Response.json(favoriteMovie, { status: 200 });
  } catch (error) {
    console.log(error);
    Response.json({ error, status: 500 });
  }
}
