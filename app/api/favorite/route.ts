import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
// import useBillboard from "@/hooks/useBillboard";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Post function called");
  // const { data } = useBillboard();
  // console.log("data",data);
  try {
    const { currentUser } = await serverAuth();
    const {movieId} = await req.json();
    console.log(movieId);

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    console.log("Existing Movie: ", existingMovie);
    console.log(typeof existingMovie);

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
    console.log("User", user);
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    Response.json({ error, status: 500 });
  }
}
