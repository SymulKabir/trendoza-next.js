import path from "path";
import { ProductImage } from "../types/product";

export const generateUniqueString = (): string => {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  let randomLetters = "";

  for (let i = 0; i < 4; i++) {
    randomLetters += letters[Math.floor(Math.random() * letters.length)];
  }

  return `${Date.now()}-${randomLetters}`;
};

export const modifyFilename = (
  filename: string | null | undefined,
): string | null => {
  if (!filename) return null;

  const fileExtension = path.extname(filename);
  const baseName = filename.replace(fileExtension, "");

  const newFilename = `${baseName}-${generateUniqueString()}${fileExtension}`;

  return newFilename;
};

 

export const getProductUrl = (
  info: ProductImage | ProductImage[] | null | undefined,
) => {
  const baseUrl = "/api/media/product"; 

  if (!info) return null;

  // case 1: string
  if (typeof info === "string") {
    return `${baseUrl}/${info}`;
  }

  // case 2: array
  if (Array.isArray(info)) {
    if (info.length === 0) return null;

    const first = info[0];

    if (typeof first === "string") {
      return `${baseUrl}/${first}`;
    }

    if (first?.name) {
      return `${baseUrl}/${first.name}`;
    }

    return null;
  }

  return null;
};
