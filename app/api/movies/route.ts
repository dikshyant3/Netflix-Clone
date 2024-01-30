import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler() {
  try {
    await serverAuth();
    const movies = await prismadb.movie.findMany();

    return Response.json(movies, { status: 200 });
  } catch (error) {
    console.error({ error });
    Response.json({ error: error ,status: 500 });
  }
}
