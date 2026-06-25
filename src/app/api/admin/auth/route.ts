import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/utils/authTokens/server"; // Adjust import to where your verifyToken function sits
import { db } from "@/src/lib/db/connection";

export async function GET(request: Request) {
  try {
    let token: string | undefined = undefined;

    // 1. Try reading token from Authorization Header first (Bearer <token>)
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Fallback: Read tokens directly from standard client cookies if header isn't passed
    if (!token) {
      const cookieStore = await cookies();
      token = 
        cookieStore.get("trendoza-admin-token")?.value || 
        cookieStore.get("trendoza-user-token")?.value;
    }

    // 3. Reject if no token was found anywhere
    if (!token) {
      return NextResponse.json(
        { message: "No authentication token provided." },
        { status: 401 }
      );
    }

    // 4. Verify and decode the JWT payload safely
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired session token." },
        { status: 401 }
      );
    }

    // 5. Query the database depending on the encoded role inside the token
    if (decoded.role === "ADMIN") {
      const admin = await db.admin.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true }, // Filter out password securely
      });

      if (!admin) {
        return NextResponse.json({ message: "Admin profile not found." }, { status: 404 });
      }

      return NextResponse.json({
        user: { ...admin, role: "ADMIN" }
      }, { status: 200 });
    } 
    
    if (decoded.role === "USER") {
      const user = await db.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true, phone: true }, // Filter out password securely
      });

      if (!user) {
        return NextResponse.json({ message: "User profile not found." }, { status: 404 });
      }

      return NextResponse.json({
        user: { ...user, role: "USER" }
      }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid system role identifier." }, { status: 400 });

  } catch (error) {
    console.error("AUTH_ME_API_ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error during session retrieval." },
      { status: 500 }
    );
  }
}