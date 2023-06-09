import { axiosInstance } from "../../api/axiosInstance";

export const login = async ({ email, password }) => {
  try {
    const Credential = { email, password };
    const res = await axiosInstance.post("users/login", Credential);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
