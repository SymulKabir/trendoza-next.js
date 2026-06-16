import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { APP_ROOT_DIRECTORY } from "@/src/constants/url";

export async function GET(
  req: NextRequest,
  { params }: { params: { folder: string; filename: string } },
) {
  try {
    const { folder, filename } = await params;
    console.log("params ->", folder, filename)

    const filePath = path.join(APP_ROOT_DIRECTORY, folder, filename);

    // ❌ file not found
    if (!fs.existsSync(filePath)) {
      return new Response("File not found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    // 🔥 detect content type
    const ext = path.extname(filename).toLowerCase();

    const mimeTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".mp3": "audio/mpeg",
      ".pdf": "application/pdf",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    // ================= STREAM FILE =================
    const stream = fs.createReadStream(filePath);

    return new Response(stream as any, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileSize.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
