import api from "./axios";

export const signin = async (userData: ISigninData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};
