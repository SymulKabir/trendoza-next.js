import { userHeader } from "@/src/utils/headers";

export const userAuthService = async () => {
  try {
    const response = await fetch("/api/user/auth", {
      method: "GET",
      headers: {
        ...userHeader(),
      },
    });
    if (!response.ok) return;

    const data = await response.json();
    return data;
  } catch (error) {}
};
