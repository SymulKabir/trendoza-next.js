import "dotenv/config";
import { products } from "./data";
import { db } from "@/src/lib/db/connection";
import {  productDir, productFilePath } from "@/src/utils/filePathProvider";
import path from "path";
import fs from "fs";

async function main() {
  for (const product of products) {
    for (const img of product.images) {
      const imageStore = path.join(__dirname, "images");
      const imgFilePath = path.join(imageStore, img);
      const destination = productFilePath(img)
      fs.cpSync(imgFilePath, destination);
    }
    await db.product.create({
      data: {
        name: product.name,
        category: product.category,
        description: product.description,
        stockStatus: product.stockStatus,
        badgeType: product.badgeType,
        images: product.images,
        availableCuts: product.availableCuts,
        variants: {
          create: product.variants,
        },
      },
    });
  }

  console.log(`${products.length} Products seeded successfully`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
