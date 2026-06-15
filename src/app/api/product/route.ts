import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
// import { uploadToCloudinary } from "@/src/utils/cloudinary"; // Example cloud storage util

export async function POST(request: Request) {
  try {
    // CRITICAL: Since data is multipart/form-data, extract it via request.formData()
    const formData = await request.formData();

    // 1. Extract plain text data fields
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const stockStatus = formData.get("stockStatus") as string;
    const badgeType = formData.get("badgeType") as string;

    // 2. Safely parse stringified arrays/JSON items from the frontend payload
    const availableCutsRaw = formData.get("availableCuts") as string;
    const variantsRaw = formData.get("variants") as string;

    const availableCuts = availableCutsRaw ? JSON.parse(availableCutsRaw) : [];
    const variants = variantsRaw ? JSON.parse(variantsRaw) : [];

    // 3. Extract uploaded images array
    const imageFiles = formData.getAll("images") as File[];

    // Validate absolute essentials
    if (!name || !category || variants.length === 0) {
      return NextResponse.json(
        { error: "Name, category, and at least one pricing tier are required." },
        { status: 400 }
      );
    }

    // 4. Process image binaries (e.g., upload to Cloudinary, AWS S3, or write local stream)
    const imageUrls: string[] = [];
    
    for (const file of imageFiles) {
      if (file.size > 0) {
        // Option B: Fallback placeholder system using file metadata for now
        imageUrls.push(`${Date.now()}-${file.name}`);
      }
    }

    // 5. Database execution block with Prisma
    // Creating the product record along with its nested child variations in a single transaction
    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        description,
        stockStatus, // e.g., "In Stock" / "Out Of Stock"
        badgeType,   // e.g., "Premium Catch" / "None"
        images: imageUrls, // Stored as a scalar string array string[] in Prisma
        availableCuts,     // Stored as an array string[] or JSON depending on database
        
        // Setup database relations for multiple weight tier sizes
        variants: {
          create: variants.map((v: any) => ({
            weight: v.weight,
            cleanedWeight: v.cleanedWeight,
            originalPrice: Number(v.originalPrice),
            sellingPrice: Number(v.sellingPrice),
            discountPercent: Number(v.discountPercent),
          })),
        },
      },
      include: {
        variants: true, // Includes variations data in the return response object
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Marketplace seafood item stored inside catalog successfully.",
        data: newProduct,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Backend execution error inside add-product route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}