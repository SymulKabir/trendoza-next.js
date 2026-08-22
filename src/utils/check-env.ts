import fs from "fs";
import path from "path";
import { storageDir } from "../../src/utils/filePathProvider";

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🔍 Checking application configuration...");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// ─────────────────────────────────────────────
// 1. Check .env file
// ─────────────────────────────────────────────

const envPath = path.join(process.cwd(), ".env");

if (!fs.existsSync(envPath)) {
  console.error("❌ Environment file not found.");
  console.error(`   Expected: ${envPath}`);
  console.error("\n   Please create a .env file before starting the app.\n");
  process.exit(1);
}

console.log("✓ .env file found");

// ─────────────────────────────────────────────
// 2. Required environment variables
// ─────────────────────────────────────────────

const requiredEnv = [
  "STORAGE_DIR",
  "JWT_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
];

const missingEnv = requiredEnv.filter(
  (key) => !process.env[key]?.trim()
);

if (missingEnv.length > 0) {
  console.error("\n❌ Missing environment variables:\n");

  missingEnv.forEach((key) => {
    console.error(`   ✗ ${key}`);
  });

  console.error(
    `\n   ${missingEnv.length} required variable(s) are missing.`
  );

  console.error("\n❌ Application startup cancelled.\n");

  process.exit(1);
}

console.log(`✓ ${requiredEnv.length} environment variables validated`);

// ─────────────────────────────────────────────
// 3. Validate PORT
// ─────────────────────────────────────────────

const port = Number(process.env.PORT || 3000);

if (
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535
) {
  console.error("\n❌ Invalid PORT.");
  console.error(`   Received: ${process.env.PORT}`);
  console.error("   PORT must be a number between 1 and 65535.\n");

  process.exit(1);
}

console.log(`✓ PORT: ${port}`);

// ─────────────────────────────────────────────
// 4. Storage directory
// ─────────────────────────────────────────────

const storagePath = storageDir();

console.log(`✓ Storage directory: ${storagePath}`);

if (!fs.existsSync(storagePath)) {
  console.log("⚠ Storage directory does not exist.");
  console.log("  Creating storage directory...");

  try {
    fs.mkdirSync(storagePath, {
      recursive: true,
    });

    console.log("✓ Storage directory created");
  } catch (error) {
    console.error("❌ Failed to create storage directory.");
    console.error(error);

    process.exit(1);
  }
} else {
  console.log("✓ Storage directory exists");
}

// ─────────────────────────────────────────────
// 5. Check storage directory is writable
// ─────────────────────────────────────────────

try {
  fs.accessSync(storagePath, fs.constants.W_OK);
  console.log("✓ Storage directory is writable");
} catch {
  console.error("❌ Storage directory is not writable.");
  console.error(`   Path: ${storagePath}\n`);

  process.exit(1);
}

// ─────────────────────────────────────────────
// 6. Application information
// ─────────────────────────────────────────────

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("✅ Environment configuration validated");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

console.log(`📦 Environment : ${process.env.NODE_ENV || "development"}`);
console.log(`🌐 Host        : ${process.env.HOST}`);
console.log(`🚪 Port        : ${port}`);
console.log(`💾 Storage     : ${storagePath}`);
console.log(`💳 Stripe      : configured`);
console.log(`🔐 JWT         : configured`);
console.log(`🗄️ Database    : ${process.env.DATABASE}`);

console.log("\n🚀 Starting Next.js...\n");