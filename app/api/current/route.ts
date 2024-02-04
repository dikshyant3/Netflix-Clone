import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";
import { omit } from "lodash";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ status: 401, message: "Unauthorized" });
    }
    const userId = session?.user?.id;
    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });
    // console.log(user);
    // console.log(omit(user, ["hashedPassword", "createdAt", "updatedAt"]));
    return Response.json({
      user: omit(user, ["hashedPassword", "createdAt", "updatedAt"]),
    });
  } catch (error) {
    Response.json({ status: 500, message: "Internal Server Error" });
  }
}
