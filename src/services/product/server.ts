import { PRODUCT_DIR } from '@/src/constants/url';
import fs from 'fs'
import path from 'path';

export const deleteProductImageService = async (filePath:string) => {
  try {
    if (!filePath) return
    const fileFullPath = path.join(PRODUCT_DIR, filePath)
    if (!fs.existsSync(fileFullPath)) return
     await fs.rmSync(fileFullPath)
  } catch (err) {
    console.error(err);
  }
};