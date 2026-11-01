import api from "@/lib/axios";

export const getEmployees = async (
  department?: string,
): Promise<IEmployee[]> => {
  const response = await api.get<IEmployee[]>("/api/employees", {
    params: department ? { department } : {},
  });

  return response.data;
};
