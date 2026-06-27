import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { verifyToken } from "@/src/utils/authTokens/server"; // Adjust import to where your verifyToken function sits
import { db } from "@/src/lib/db/connection";

export async function GET(request: Request) {
  try {
    const headerList = await headers();
    const adminId = headerList.get("x-admin-id");
    if (!adminId) {
      return NextResponse.json(
        { message: "unauthorized required" },
        { status: 404 },
      );
    }
    const admin = await db.admin.findUnique({
      where: { id: adminId },
      select: { id: true, name: true, email: true }, // Filter out password securely
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin profile not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        user: { ...admin, role: "ADMIN" },
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
