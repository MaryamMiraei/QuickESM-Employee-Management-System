import { addEmployee } from "@/api/employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddEmployee = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    mutationKey: ["employees"],

    onSuccess: () => {
      toast.success("Employee added successfully!");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      onSuccessCallback();
    },

    onError: () => {
      toast.error("Failed to add employee!");
    },
  });
};
