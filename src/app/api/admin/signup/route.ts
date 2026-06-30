import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/src/lib/db/connection";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    // 1. Basic Server-side Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields (Name, Email, Password)" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    // 2. Check if user already exists
    const existingUser = await db.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 },
      );
    }

    // 3. Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 5. Create user in the Database
    const newAdmin = await db.admin.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
      },
    });
    console.log("newAdmin -->>", newAdmin);
    // 6. Return safe user data (exclude the hashed password from the response)
    return NextResponse.json(
      {
        message: "User registered successfully",
        admin: {
          id: newAdmin.id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: "ADMIN",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("SIGNUP_API_ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
