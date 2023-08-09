import { axiosInstance } from "../../api/axiosInstance";

export const createPurchase = async (token, productId, quantity) => {
  try {
    await axiosInstance.post(
      "purchases",
      { productId, quantity }, // Send productId and quantity in the request body
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else throw new Error("Something went wrong with the purchase request");
  }
};