import { getAdminToken, getUserToken } from "./authTokens/client";

export const userHeader = () => {
  const token = getUserToken();
  if (!token) return {};
  return { Authentication: `Bearer ${token}` };
};
export const adminHeader = () => {
  const token = getAdminToken();
  if (!token) return {};
  return { Authentication: `Bearer ${token}` };
};
