import axiosInstance from "../utils/request";

export const signup = async (user: any) => {
  return await axiosInstance.post("/admin/signup", user);
};
