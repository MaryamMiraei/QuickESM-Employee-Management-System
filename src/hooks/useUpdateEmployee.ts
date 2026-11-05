import { updateEmployee } from "@/api/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateEmployee = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,
    mutationKey: ["employees"],

    onSuccess: () => {
      toast.success("Employee updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      onSuccessCallback();
    },

    onError: () => {
      toast.error("Failed to update employee!");
    },
  });
};
