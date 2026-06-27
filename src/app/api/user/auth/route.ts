import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { verifyToken } from "@/src/utils/authTokens/server"; // Adjust import to where your verifyToken function sits
import { db } from "@/src/lib/db/connection";

export async function GET(request: Request) {
  try {
    const headerList = await headers();
    const userId = headerList.get("x-user-id");

    console.log("userId -=-", userId);
    if (!userId) {
      return NextResponse.json(
        { message: "unauthorized required" },
        { status: 404 },
      );
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, phone: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User profile not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        user: { ...user, role: "USER" },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("AUTH_ME_API_ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error during session retrieval." },
      { status: 500 },
    );
  }
}
