import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/prisma/client/client";
import { BD_CONFIG } from "@/src/constants";


const adapter = new PrismaMariaDb({
  host: BD_CONFIG.host,
  user: BD_CONFIG.user,
  password: BD_CONFIG.password,
  database: BD_CONFIG.database,
  connectionLimit: BD_CONFIG.connectionLimit,
});
const db = new PrismaClient({ adapter }); 

export { db };