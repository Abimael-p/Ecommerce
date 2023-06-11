import { axiosInstance } from "../../api/axiosInstance";

export const getShoppingHistory = async (token) => {
  try {
    const res = await axiosInstance.get("purchases", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else throw new Error("something went wrong with the purchase request");
  }
};
