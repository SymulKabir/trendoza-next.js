export const BD_CONFIG = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "trendoza_user",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "trendoza",
  port: process.env.DB_PORT || 3306,
  connectionLimit: 5,
};
export const DATABASE_URL=`mysql://${BD_CONFIG.user}:${BD_CONFIG.password}@${BD_CONFIG.host}:${BD_CONFIG.port}/${BD_CONFIG.database}`

export const USER_TOKEN_KEY = "trendoza-user-token";
export const ADMIN_TOKEN_KEY = "trendoza-admin-token";

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"