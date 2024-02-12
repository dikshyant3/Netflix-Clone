import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function DELETE(req:NextRequest) {
  try {
    const { currentUser } = await serverAuth();
    const {movieId} = await req.json();
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) {
      throw new Error("Invalid ID");
    }
    const updatedFavoriteId = without(currentUser.favoriteId, movieId);
    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteId: updatedFavoriteId,
      },
    });
    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error, status: 500 });
  }
}
