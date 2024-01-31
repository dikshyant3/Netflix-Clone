import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import useBillboard from "@/hooks/useBillboard";

export async function GET() {
  const { data } = useBillboard();
  try {
    const { currentUser } = await serverAuth();
    const movieId = data.id;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) {
      throw new Error("Invalid ID");
    }
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    Response.json({error,status:400})
  }
}

