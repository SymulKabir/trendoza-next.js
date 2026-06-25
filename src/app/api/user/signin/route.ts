import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/src/lib/db/connection";
import { generateToken } from "@/src/utils/authTokens/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Basic Server-side Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required fields." },
        { status: 400 },
      );
    }

    // 2. Find the user in the Database
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // 3. Generic error if user doesn't exist (prevents email harvesting)
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password combination." },
        { status: 401 },
      );
    }

    // 4. Verify password securely using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password combination." },
        { status: 401 },
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: "USER",
    });

    // 5. Return safe user data (exclude the hashed password from the response)
    return NextResponse.json(
      {
        message: "Authentication successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: "USER", 
        },
        token: token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("USER_SIGNIN_API_ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
