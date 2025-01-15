const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
// const REMOVE_BG_API_KEY = process.env.VITE_REMOVE_BG_API_KEY || "random-value-here";

if (!process.env.VITE_REMOVE_BG_API_KEY) {
  console.warn("Warning: VITE_REMOVE_BG_API_KEY is not defined. Using fallback value.");
}

interface ProductDetails {
  name: string;
  serialNumber: string;
  productionDate: string;
  manufacturer: string;
}

export async function verifyProduct(productId: string) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to verify product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error verifying product:", error);
    throw error;
  }
}

export async function registerProduct(manufacturerId: string, productDetails: ProductDetails) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        manufacturerId,
        productDetails,
      }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to register product");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error registering product:", error);
    throw error;
  }
}