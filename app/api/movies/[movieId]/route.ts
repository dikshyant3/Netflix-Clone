import { NextRequest } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
// import useBillboard from "@/hooks/useBillboard";

export async function GET(req:NextRequest,{ params }: { params: { movieId: string } }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    await serverAuth();
    if (typeof params.movieId !== "string") {
      throw new Error("Invalid Id");
    }
    if (!params.movieId) {
      throw new Error("Missing Id");
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: params.movieId,
      },
    });
    return Response.json(movies, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error, status: 500 });
  }
}


