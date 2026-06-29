import { PRODUCT_DIR } from "@/src/constants/url";
import { adminHeader, userHeader } from "@/src/utils/headers";

export const addProductService = async (payload) => {
  try {
    console.log("hello from server");
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("category", payload.category);
    formData.append("description", payload.description);
    formData.append("stockStatus", payload.stockStatus);
    formData.append("badgeType", payload.badgeType);

    formData.append("availableCuts", JSON.stringify(payload.availableCuts));
    formData.append("variants", JSON.stringify(payload.variants));

    console.log("payload -->>", payload);
    payload?.rawImageFiles?.forEach((img) => {
      formData.append("images", img);
    });
    const response = await fetch("/api/product/protected/add", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log("error -->", error);
    return error;
  }
};

export const getProductService = async ({
  pageNumber = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
}) => {
  try {
    const res = await fetch(
      `/api/product?page=${pageNumber}&limit=${limit}&sortBy=${sortBy}&order=${order}`,
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProductService = async (ids: string[]) => {
  try {
    const res = await fetch(`/api/product/protected/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids })
    });
    if (!res.ok) {
      return;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Add this inside your client services module directory

export async function updateCartService(payload: {
  productId: string;
  variantId: string;
  quantity: number;
}) {
  const response = await fetch("/api/cart/protected/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Could not modify the remote cart status data.");
  }

  return response.json();
}


export const fetchProductByIdService = async (productId: string) => {
  const response = await fetch(`/api/product/${productId}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};