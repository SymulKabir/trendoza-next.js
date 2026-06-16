export const BD_CONFIG = {
  host: "127.0.0.1",
  user: "trendoza_user",
  password: "12345",
  database: "trendoza",
  port: 3306,
  connectionLimit: 5,
};
export const DATABASE_URL=`mysql://${BD_CONFIG.user}:${BD_CONFIG.password}@${BD_CONFIG.host}:${BD_CONFIG.port}/${BD_CONFIG.database}`