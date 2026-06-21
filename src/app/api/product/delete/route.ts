import { db } from "@/src/lib/db/connection";
import { deleteProductImageService } from "@/src/services/product/server";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete products",
      },
      { status: 500 }
    );
    const { ids } = await request.json();
    console.log("ids ->>", ids)
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product IDs are required",
        },
        { status: 400 }
      );
    }

    const result = await db.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    console.log("result -->>>", result)
    await Promise.all(result.map(async (product) => {
      if (product?.images?.length) {
        await Promise.all(product.images.map(async (imgInfo) => {
          await deleteProductImageService(imgInfo.name)
        }))
      }
    }))

    return NextResponse.json({
      success: true,
      message: `${result.count} products deleted successfully`,
      count: result.count,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete products",
      },
      { status: 500 }
    );
  }
}