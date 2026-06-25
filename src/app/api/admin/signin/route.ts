import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/src/lib/db/connection";
import { generateToken } from "@/src/utils/authTokens/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Basic Server-side Input Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required fields." },
        { status: 400 },
      );
    }

    // 2. Fetch the existing admin record from the DB
    const adminUser = await db.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    // 3. Fail early if account doesn't exist
    // Note: We use a generic message to limit data harvesting risks
    if (!adminUser) {
      return NextResponse.json(
        { message: "Invalid email or password combination." },
        { status: 401 },
      );
    }

    // 4. Compare input plaintext password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      adminUser.password,
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password combination." },
        { status: 401 },
      );
    }

    const token = generateToken({
      id: adminUser.id,
      email: adminUser.email,
      role: "ADMIN",
    });
    // Return safely filtered data (Never expose the hashed password)
    return NextResponse.json(
      {
        message: "Authentication successful",
        user: {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: "ADMIN",
        },
        token: token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("SIGNIN_API_ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
