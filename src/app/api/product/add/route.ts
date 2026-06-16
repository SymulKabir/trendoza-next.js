import { NextResponse } from "next/server";
import { db } from "@/src/lib/db/connection";
// import { uploadToCloudinary } from "@/src/utils/cloudinary"; // Example cloud storage util
import fs from "fs";
import path from "path";
import { PRODUCT_DIR } from "@/src/constants/url";
import { modifyFilename } from "@/src/utils";

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
    console.log("imageFiles -->>", imageFiles);

    // Validate absolute essentials
    if (!name || !category || variants.length === 0) {
      return NextResponse.json(
        {
          error: "Name, category, and at least one pricing tier are required.",
        },
        { status: 400 },
      );
    }

    // 4. Process image binaries (e.g., upload to Cloudinary, AWS S3, or write local stream)
    const imageUrls: any[] = [];
    const updateImages = imageFiles.map((file) => {
      const name = modifyFilename(file.name);
      imageUrls.push({ name: name, originalName: file.name });

      return {
        alias: name,
        file,
      };
    });

    // 5. Database execution block with Prisma
    // Creating the product record along with its nested child variations in a single transaction
    const newProduct = await db.product.create({
      data: {
        name,
        category,
        description,
        stockStatus, 
        badgeType,  
        images: imageUrls,  
        availableCuts, 
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
    console.log("newProduct -->>>", newProduct);
    if (!newProduct) {
      return NextResponse.json(
        {
          message: "Failed to create product.",
        },
        { status: 200 },
      );
    }
    if (updateImages?.length) {
      await Promise.all(
        updateImages.map(async (item) => {
          console.log("item ->", item);
          const file = item.file;
          if (!file) return;

          const itemLocation = path.join(PRODUCT_DIR, item.alias);
          if (!fs.existsSync(PRODUCT_DIR)) {
            await fs.mkdirSync(PRODUCT_DIR, { recursive: true });
          }
          if (fs.existsSync(itemLocation)) {
            return;
          }
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          await fs.promises.writeFile(itemLocation, buffer);
        }),
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Marketplace seafood item stored inside catalog successfully.",
        data: newProduct,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Backend execution error inside add-product route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
