export const addProductService = async (payload) => {
    try {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("category", payload.category);
        formData.append("description", payload.description);
        formData.append("stockStatus", payload.stockStatus);
        formData.append("badgeType", payload.badgeType);

        formData.append("availableCuts", JSON.stringify(payload.availableCuts));
        formData.append("variants", JSON.stringify(payload.variants));

        payload.images.forEach((img) => {
            formData.append("images", img.file);
        });

        const response = await fetch("/api/product/add", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server returned error status: ${response.status}`);
        }

        const result = await response.json();
        return result

    } catch (error) {
        return error
    }
};