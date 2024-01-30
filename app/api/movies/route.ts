import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    await serverAuth();
    const movies = await prismadb.movie.findMany();
    // console.log(movies)

    return Response.json(movies, { status: 200 });
  } catch (error) {
    console.error({ error });
    Response.json({ error: error, status: 500 });
  }
}
