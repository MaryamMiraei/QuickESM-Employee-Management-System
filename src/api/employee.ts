import api from "@/lib/axios";

export const getEmployees = async (): Promise<IEmployee[]> => {
  const response = await api.get<IEmployee[]>("/api/employees");

  return response.data;
};
