import path from "path"

export const APP_ROOT_DIRECTORY = process.env.APP_ROOT_DIRECTORY ? path.join(process.cwd(), process.env.APP_ROOT_DIRECTORY) : path.join(process.cwd(), "storage");
export const PRODUCT_DIR = path.join(APP_ROOT_DIRECTORY, "product")
