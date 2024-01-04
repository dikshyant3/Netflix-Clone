import prismadb from "@/lib/prismadb";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";


const serverAuth = async (req: NextRequest) => {
  const session = await getSession({ req:NextRequest. });

  if (!session?.user?.email) {
    throw new Error("Not Signed in!!!");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("Not Signed in!!!");
  }
  return { currentUser };
};

export default serverAuth;
