import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import useBillboard from "@/hooks/useBillboard";

export async function DELETE() {
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
    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });
    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    Response.json({ error, status: 500 });
  }
}
