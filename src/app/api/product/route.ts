import { NextResponse } from "next/server";
import { db } from "@/src/lib/db/connection";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const headerList = await headers();
    const userId = headerList.get("x-user-id");

    // pagination
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    // sorting
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";

    // filters (optional)
    const category = searchParams.get("category");
    const name = searchParams.get("name");

    const products = await db.product.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(name
          ? {
            name: {
              contains: name,
            },
          }
          : {}),
      },
      include: {
        variants: true,
        cartItems: userId
          ? {
            where: {
              cart: { userId: userId },
            },
          }
          : false,
      },
      orderBy: {
        [sortBy]: order,
      },
      skip,
      take: limit,
    });


    const data =products.length ? products.map((item) => {
      const { cartItems, ...productWithoutCartItems } = item;
      return {
        ...productWithoutCartItems,
        cartItemCount: item.cartItems?.[0]?.quantity || 0,
      };
    }) : ""
    const total = await db.product.count({
      where: {
        ...(category ? { category } : {}),
        ...(name
          ? {
            name: {
              contains: name,
            },
          }
          : {}),
      },
    });

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      skip,
      totalPages: Math.ceil(total / limit),
      data: data,
    });
  } catch (error: any) {
    console.error("GET products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
