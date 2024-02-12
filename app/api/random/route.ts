import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await serverAuth();
    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    if (randomMovies.length > 0) {
      return Response.json(randomMovies[0], { status: 200 });
    } else {
      console.error("No movies found.");
      return Response.json({ status: 404, message: "No movies found" });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
