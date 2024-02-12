import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";



export async function POST(req: NextRequest) {
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
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteId: {
          push: movieId,
        },
      },
    });
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error, status: 500 });
  }
}
