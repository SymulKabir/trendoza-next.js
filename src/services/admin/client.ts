import { adminHeader } from "@/src/utils/headers";

export const adminAuthService = async () => {
  try {
    console.log("hello form adminAuthService")
    const response = await fetch("/api/admin/auth", {
      method: "GET",
      headers: {
        ...adminHeader(),
      },
    });
    if (!response.ok) return;

    const data = await response.json();
    return data;
  } catch (error) {}
};
