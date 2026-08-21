import { productFilePath } from '@/src/utils/filePathProvider';
import fs from 'fs'

export const deleteProductImageService = async (filePath: string) => {
  try {
    if (!filePath) return
    const fileFullPath = productFilePath(filePath)
    if (!fileFullPath) {
      return
    }
    if (!fs.existsSync(fileFullPath)) return
    await fs.rmSync(fileFullPath)
  } catch (err) {
    console.error(err);
  }
};