export const getCartItemService = async () => {
  try { 
    const response = await fetch("/api/cart/protected/get", {
      method: "GET"
    });
    if (!response.ok) return;

    const data = await response.json();
    return data;
  } catch (error) {}
};