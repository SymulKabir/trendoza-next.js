import { NextResponse } from "next/server";
import { db } from "@/src/lib/db/connection";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headerList = await headers();
    const userId = headerList.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Fetch only the cart for this user
    const cart = await db.cart.findFirst({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: { select: { name: true, category: true, images: true } },
            variant: { select: { weight: true, sellingPrice: true, originalPrice: true } },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Directly transform items into a simple list
    const flatItems = cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      variantId: item.variantId,
      productName: item.product?.name,
      category: item.product?.category,
      images: item.product?.images,
      weight: item.variant?.weight,
      unitPrice: item.variant?.sellingPrice || 0,
      quantity: item.quantity,
      totalPrice: (item.variant?.sellingPrice || 0) * item.quantity,
    }));

    return NextResponse.json({
      success: true,
      data: flatItems, // Now this is just an array of items
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}