import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export const POST = async (request: any) => {
  try {
    const { email, name, password } = await request.json();

    // console.log(email,name,password)

    if (!email || typeof email !== 'string' || !email.trim()) {
      return new NextResponse("Invalid email", { status: 400 });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email:email,
      },
    });


    if (existingUser) {
      return new NextResponse("Email taken", { status: 422 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email:email.trim(),
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("Error: ",error);
    return NextResponse.json({ error }, { status: 400 });
  }
};
