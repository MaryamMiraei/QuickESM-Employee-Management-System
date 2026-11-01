import api from "@/lib/axios";

export const getDashboard = async (): Promise<IDashboard> => {
  const response = await api.get<IDashboard>("/api/dashboard");

  return response.data;
};
