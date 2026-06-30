import { db } from "@/src/lib/db/connection";
import { deleteProductImageService } from "@/src/services/product/server";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    const { ids } = await request.json();


    const productsToDelete = await db.product.findMany({
      where: { id: { in: ids } },
      include: { variants: true } // or whatever relation holds images
    });
 
    for (const product of productsToDelete) {
      if (product?.images?.length) {
        await Promise.all(product.images.map(async (imgInfo) => {
          await deleteProductImageService(imgInfo.name)
        }))
      }
    }
    // 1. Delete associated data first
    // Note: Adjust these based on your actual schema (CartItem, OrderItem, Variant)
    await db.cartItem.deleteMany({ where: { productId: { in: ids } } });
    await db.productVariant.deleteMany({ where: { productId: { in: ids } } });

    // 2. Now delete the products
    const result = await db.product.deleteMany({
      where: { id: { in: ids } },
    });
 
    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete" }, { status: 500 });
  }
}