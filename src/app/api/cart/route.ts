// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { db } from "@/src/lib/db/connection"; // Using your verified db instance export

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, variantId, quantity } = body;

    if (!productId || !variantId || quantity === undefined) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // 1. GET A REAL USER FROM YOUR DATABASE
    // If you are not using Auth.js/NextAuth session hooks yet, grab an existing user ID dynamically:
    const fallbackUser = await db.user.findFirst();
    
    if (!fallbackUser) {
      return NextResponse.json({ 
        success: false, 
        message: "No users found in your database. Please register/create a user profile first." 
      }, { status: 404 });
    }

    const activeUserId = fallbackUser.id; // Resolves your P2003 constraint issues instantly

    // 2. Locate or build the target cart safely
    let cart = await db.cart.findFirst({
      where: { userId: activeUserId },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { userId: activeUserId },
      });
    }

    // 3. Handle item mutations safely
    if (quantity <= 0) {
      await db.cartItem.deleteMany({
        where: { cartId: cart.id, productId, variantId },
      });
      return NextResponse.json({ success: true, message: "Item dropped successfully" });
    }

    const existingCartItem = await db.cartItem.findFirst({
      where: { cartId: cart.id, productId, variantId },
    });

    if (existingCartItem) {
      await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity },
      });
    } else {
      await db.cartItem.create({
        data: { cartId: cart.id, productId, variantId, quantity },
      });
    }

    return NextResponse.json({ success: true, message: "Cart synced successfully" });
  } catch (error: any) {
    console.error("Cart synchronization error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}