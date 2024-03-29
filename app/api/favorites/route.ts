import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export const dynamic = "force-dynamic";

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
    return Response.json({ error, status: 500 });
  }
}
