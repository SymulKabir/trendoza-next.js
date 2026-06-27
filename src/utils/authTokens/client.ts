import { ADMIN_TOKEN_KEY, USER_TOKEN_KEY } from "@/src/constants";
import Cookies from "js-cookie";
   
 
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 1,       // 1 day expiration
  path: "/",        // Accessible across the entire application domain
  secure: true,     // Transmitted securely over HTTPS only
  sameSite: "Lax"   // CSRF security protection layer
};

// --- USER TOKENS (Cookies) ---

export const setUserToken = (token: string): void => {
  Cookies.set(USER_TOKEN_KEY, token, COOKIE_OPTIONS);
};

export const getUserToken = (): string | null => {
  return Cookies.get(USER_TOKEN_KEY) || null;
};

export const removeUserToken = (): void => {
  Cookies.remove(USER_TOKEN_KEY, { path: "/" });
};


// --- ADMIN TOKENS (Cookies) ---

export const setAdminToken = (token: string): void => {
  Cookies.set(ADMIN_TOKEN_KEY, token, COOKIE_OPTIONS);
};

export const getAdminToken = (): string | null => {
  return Cookies.get(ADMIN_TOKEN_KEY) || null;
};

export const removeAdminToken = (): void => {
  Cookies.remove(ADMIN_TOKEN_KEY, { path: "/" });
};


// --- GLOBAL LOGOUT ---

export const clearAllTokens = (): void => {
  removeUserToken();
  removeAdminToken();
};