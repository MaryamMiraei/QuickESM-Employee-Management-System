import api from "@/lib/axios";

export const getPayslips = async (): Promise<IPayslip[]> => {
  const response = await api.get("/api/payslips");
  return response.data;
};
export const getPayslip = async (payslipID:string): Promise<IPayslip> => {
  const response = await api.get(`/api/print/payslips/${payslipID}`);
  return response.data;
};
