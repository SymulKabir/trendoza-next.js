import fs from 'fs';
import path from 'path';

const confirmDir = (path: string) => {
    if (!path) return null
    if (!fs.existsSync(path)) fs.mkdirSync(path)
}
export const appRootDir = () => {
    return process.cwd();
};
export const storageDir = () => {
  const storagePath = process.env.STORAGE_DIR;

  if (!storagePath) {
    throw new Error("STORAGE_DIR environment variable is not configured");
  }

  const dir = path.join(appRootDir(), storagePath);

  confirmDir(dir);

  return dir;
};
export const productDir = () => {
    const dir = path.join(storageDir(), "product")
    confirmDir(dir)
    return dir
};
export const productFilePath = (name: string) => { 

  return path.join(productDir(), name);
};



 