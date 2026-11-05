import api from "@/lib/axios";

export const getEmployees = async (
  department?: string,
): Promise<IEmployee[]> => {
  const response = await api.get<IEmployee[]>("/api/employees", {
    params: department ? { department } : {},
  });

  return response.data;
};

export const addEmployee = async (data: IEmployee) => {
  const response = await api.post("/api/employees", data);

  return response.data;
};

export const updateEmployee = async ({
  id,
  data,
}: {
  id: string;
  data: IEmployee;
}) => {
  const response = await api.put(`/api/employees/${id}`, data);

  return response.data;
};