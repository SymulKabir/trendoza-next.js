import { db } from "@/src/lib/db/connection";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const paramsObj = await params;
    const productId = paramsObj.id
   
    const product = await db.product.findUnique({
      where: { id: productId },
      include: { variants: true }, // Joins the variants table
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product); 
  } catch (error) { 
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
