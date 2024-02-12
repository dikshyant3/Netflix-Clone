import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await serverAuth();
    const movies = await prismadb.movie.findMany();

    return Response.json(movies, { status: 200 });
  } catch (error) {
    console.error({ error });
    return Response.json({ error: error, status: 500 });
  }
}
