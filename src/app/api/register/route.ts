import prismaClient from "@/libs/prisma";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const randomSalt = randomInt(10, 16);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    const user = prismaClient.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "ERROR_REGISTRATION");
    return new NextResponse("Internal erro", { status: 500 });
  }
}
