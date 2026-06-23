import { NextResponse } from "next/server";
import { db } from "@/src/lib/db/connection";

export async function GET() {
  try {
    // Fetch all carts with their relation tables eager-loaded
    const carts = await db.cart.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                category: true,
                images: true,
              },
            },
            variant: {
              select: {
                weight: true,
                sellingPrice: true,
                originalPrice: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc", // Show recently active carts first
      },
    });

    // Transform data to append calculated runtime totals
    const formattedCarts = carts.map((cart) => {
      let totalCartValue = 0;
      let totalItemCount = 0;

      const items = cart.items.map((item) => {
        const itemPrice = item.variant?.sellingPrice || 0;
        const lineTotal = itemPrice * item.quantity;

        totalCartValue += lineTotal;
        totalItemCount += item.quantity;

        return {
          id: item.id,
          productId: item.productId,
          productName: item.product?.name,
          category: item.product?.category,
          images: item.product?.images,
          variantId: item.variantId,
          weight: item.variant?.weight,
          unitPrice: itemPrice,
          quantity: item.quantity,
          totalPrice: lineTotal,
        };
      });

      return {
        id: cart.id,
        userId: cart.userId,
        customer: cart.user,
        totalItems: totalItemCount,
        totalValue: totalCartValue,
        items,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      totalActiveCarts: formattedCarts.length,
      data: formattedCarts,
    });
  } catch (error: any) {
    console.error("Failed to fetch all carts:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}