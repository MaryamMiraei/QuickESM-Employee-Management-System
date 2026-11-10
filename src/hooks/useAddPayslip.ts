import { addPayslip } from "@/api/payslips";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddPayslip = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPayslip,
    mutationKey: ["payslips"],

    onSuccess: () => {
      toast.success("Payslip added successfully!");

      queryClient.invalidateQueries({
        queryKey: ["payslips"],
      });

      onSuccessCallback();
    },

    onError: () => {
      toast.error("Failed to add payslip!");
    },
  });
};
